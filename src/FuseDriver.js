const fuse = require('fuse-bindings');

class FuseDriver {

	/**
	 *
	 * @param {FuseWrapper} fuseWrapper
	 */
	constructor(fuseWrapper) {
		this.fuseWrapper = fuseWrapper;
		this.mountPoint = module.exports.tree;
		this.mount(this.mountPoint, fuseWrapper);
	}

	mount(mointPoint, fuseWrapper) {
		let options = {
			init(cb) {
				console.log('init');
				cb(0);
			},

			access(path, mode, cb) {
				console.log('access');
				cb(0);
			},

			statfs(path, cb) {
				console.log('statfs');
				cb(0, {
					bsize: 1000000,
					frsize: 1000000,
					blocks: 1000000,
					bfree: 1000000,
					bavail: 1000000,
					files: 1000000,
					ffree: 1000000,
					favail: 1000000,
					fsid: 1000000,
					flag: 1000000,
					namemax: 1000000
				});
			},

			getattr(path, cb) {
				console.log('getattr:', path);
				if (path === '/') {
					cb(0, {
						mtime: new Date(),
						atime: new Date(),
						ctime: new Date(),
						nlink: 1,
						size: 100,
						mode: 16877,
						uid: process.getuid ? process.getuid() : 0,
						gid: process.getgid ? process.getgid() : 0
					});
					return;
				}
				let attr = fuseWrapper.getPathAttr(path);
				if (attr) {
					let def = {
						mtime: new Date(),
						atime: new Date(),
						ctime: new Date(),
						size: 100,
						mode: 16877,
						uid: process.getuid(),
						gid: process.getgid()
					};
					Object.assign(def, attr);
					cb(0, def);
					return;
				}
				cb(fuse.ENOENT);
			},

			fgetattr(path, fd, cb) {
				console.log('fgetattr');
				cb(0, {
					mtime: new Date(),
					atime: new Date(),
					ctime: new Date(),
					size: 100,
					mode: 16877,
					uid: process.getuid(),
					gid: process.getgid()
				})
			},

			flush(path, fd, cb) {
				console.log('flush');
				cb(0);
			},

			fsync(path, fd, datasync, cb) {
				console.log('fsync');
				cb(0);
			},

			fsyncdir(path, fd, datasync, cb) {
				console.log('fsyncdir');
				cb(0);
			},

			readdir(path, cb) {
				console.log('readdir');
				fuseWrapper.getDirectoryContent(path, cb);
			},

			truncate(path, size, cb) {
				console.log('truncate');
				cb(0);
			},

			ftruncate(path, fd, size, cb) {
				console.log('ftruncate');
				cb(0);
			},

			readlink(path, cb) {
				console.log('readlink');
				cb(null, 'file.txt');
			},

			chown(path, uid, gid, cb) {
				console.log('chown');
				cb(0);
			},

			chmod(path, mode, cb) {
				console.log('chmod');
				cb(0);
			},

			mknod(path, mode, dev, cb) {
				console.log('mknod');
				cb(0);
			},

			setxattr(path, name, buffer, length, offset, flags, cb) {
				console.log('setxattr');
				cb(0)
			},

			getxattr(path, name, buffer, length, offset, cb) {
				console.log('getxattr');
				cb(0);
			},

			listxattr(path, buffer, length, cb) {
				console.log('listxattr');
				cb(0);
			},

			removexattr(path, name, cb) {
				console.log('removexattr');
				cb(0);
			},

			open(path, flags, cb) {
				console.log('open');
				cb(0, 1);
			},

			opendir(path, flags, cb) {
				console.log('opendir');
				cb(0);
			},

			read(path, fd, buffer, length, position, cb) {
				console.log('read');
				cb(0)
			},

			write(path, fd, buffer, length, position, cb) {
				console.log('write');
				cb(0, 0);
			},

			release(path, fd, cb) {
				console.log('release');
				cb(0)
			},

			releasedir(path, fd, cb) {
				console.log('releasedir');
				cb(0);
			},

			create(path, mode, cb) {
				console.log('create');
				cb(0);
			},

			utimens(path, atime, mtime, cb) {
				console.log('utimens');
				cb(0);
			},

			unlink(path, cb) {
				console.log('unlink');
				cb(0);
			},

			rename(src, dest, cb) {
				console.log('rename');
				cb(0);
			},

			link(src, dest, cb) {
				console.log('link');
				cb(0);
			},

			symlink(src, dest, cb) {
				console.log('symlink');
				cb(0);
			},

			mkdir(path, mode, cb) {
				console.log('mkdir');
				fuseWrapper.createDirectory(path, mode, cb);
			},

			rmdir(path, cb) {
				console.log('rmdir');
				fuseWrapper.removeDirectory(path, cb);
			},
			destroy(cb) {
				console.log('destroy');
				cb(0);
			},
			options: ['nonempty']
		};

		process.on('SIGINT', () => {
			fuse.unmount(this.mountPoint, (err) => {
				if (err) {
					console.log('filesystem at ' + this.mountPoint + ' not unmounted', err)
				} else {
					console.log('filesystem at ' + this.mountPoint + ' unmounted')
				}
			})
		});
		fuse.mount(this.mountPoint, options, (err) => {
			console.log("try to mount on", this.mountPoint);
			if (err) throw err;
			console.log('filesystem mounted on ' + this.mountPoint)
		});
		console.log("mountpoint:", this.mountPoint);
	}

}

module.exports = FuseDriver;
module.exports.inject = ['FuseWrapper'];
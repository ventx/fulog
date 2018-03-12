const fuse = require('fuse-bindings');

class FuseWrapper {

	/**
	 *
	 * @param {EventStorage} eventStorage
	 * @param {Mount} mount
	 * @param {DirectoryStructure} directoryStructure
	 * @param {Symlinks} symlinks
	 */
	constructor(eventStorage, mount, directoryStructure, symlinks) {
		this.directory = module.exports.tree;
		this.mount = mount;
		this.eventStorage = eventStorage;
		this.directoryStructure = directoryStructure;
		this.symlinks = symlinks;
	}

	createDirectory(path, mode, cb) {
		this.eventStorage.commit('DirectoryCreated', path, mode).then(() => cb(0));
	}

	removeDirectory(path, cb) {
		this.eventStorage.commit('DirectoryRemoved', path).then(() => cb(0))
	}

	getDirectoryContent(path, cb) {
		let dirs = this.mount.getDirectoryContent(path);
		console.log("available dirs:", dirs);
		cb(0, dirs);
	}

	getPathAttr(path) {
		let attr = this.directoryStructure.getPathAttr(path);
		if(attr) {
			return attr;
		}
		attr = this.symlinks.getPathAttr(path);
		if(attr) {
			return attr;
		}
	}

	createSymlink(source, destination, cb) {
		this.eventStorage.commit('SymlinkCreated', source, destination).then(() => cb(0));
	}

	readSymlink(path, cb) {
		let target = this.symlinks.readSymlink(path);
		if(!target) {
			cb(fuse.ENOENT);
		} else {
			cb(null, target);
		}
	}

	unlinkFile(path, cb) {
		this.eventStorage.commit('FileUnlinked', path).then(() => cb(0));
	}

}

module.exports = FuseWrapper;
module.exports.inject = ['EventStorage', 'Mount', 'DirectoryStructure', 'Symlinks'];
const AbstractProjector = require('./AbstractProjector');
const FileTypes = require('../helper/FileTypes');


class Symlinks extends AbstractProjector {

	/**
	 *
	 * @param  {Mount} mount
	 */
	constructor(mount) {
		super(['fs', 'symlink']);
		this.symlinks = {};
		this.mount = mount;
		this.loadEventStreams();
	}

	symlinkCreated({source, destination}) {
		console.log("new symlink:", source, destination);
		this.mount.createTreeEntry(destination);
		this.symlinks[destination] = source;
	}

	fileUnlinked({path}) {
		if (this.symlinks[path]) {
			this.mount.removeTreeEntry(path);
			delete this.symlinks[path];
		}
	}

	fileRenamed({source, destination}) {
		if (this.symlinks[source]) {
			this.mount.renameTreeEntry(source, destination);
			this.symlinks[destination] = this.symlinks[source];
			delete this.symlinks[source];
		}
	}

	readSymlink(path) {
		return this.symlinks[path];
	}

	getPathAttr(path) {
		if (this.symlinks[path]) {
			return {
				mode: FileTypes.SYM_LINK + 0o777
			}
		}
	}

}

module.exports = Symlinks;
module.exports.inject = ['Mount'];
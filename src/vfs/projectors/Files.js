const AbstractProjector = require('./AbstractProjector');
const uuid = require('uuid').v4;
const FileTypes = require('../helper/FileTypes');

class Files extends AbstractProjector {

	/**
	 * @param {Mount} mount
	 */
	constructor(mount) {
		super(['fs', 'files']);
		this.mount = mount;
		this.attrList = {};
		this.fileList = {};
	}

	fileCreated({path, mode}) {
		this.mount.createTreeEntry(path);
		if(!this.attrList[path]) {
			this.attrList[path] = {mode: mode + FileTypes.FILE};
		} else {
			this.attrList[path].mode = mode + FileTypes.FILE;
		}
		this.fileList[path] = uuid();
	}

	fileRenamed({source, destination}) {
		if(this.fileList[source]) {
			this.fileList[destination] = this.fileList[source];
			this.attrList[destination] = this.fileList[source];
			delete this.fileList[source];
			delete this.attrList[source];
		}
	}

	fileUnlinked() {

	}

	getPathAttr(path) {
		return this.attrList[path];
	}


	getFile(path) {

	}

}

module.exports = Files;
module.exports.inject = ['Mount'];
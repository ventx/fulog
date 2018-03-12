const AbstractProjector = require('./AbstractProjector');
const dotProp = require('dot-prop');
const FileTypes = require('../helper/FileTypes');

/**
 * Represents a directory structure. One of these is created for each fulog managed directory.
 * @author Wolfgang Felbermeier (@f3lang)
 */
class DirectoryStructure extends AbstractProjector {

	/**
	 *
	 * @param {Mount} mount
	 */
	constructor(mount) {
		super(['directory', 'fs']);
		this.structure = {};
		this.attrList = {};
		this.mount = mount;
		this.loadEventStreams();
	}

	directoryCreated({path, mode}) {
		this.mount.createTreeEntry(path);
		if(!this.attrList[path]) {
			this.attrList[path] = {mode: mode + FileTypes.DIRECTORY};
		} else {
			this.attrList[path].mode = mode + FileTypes.DIRECTORY;
		}
		dotProp.set(this.structure, path.slice(1).replace(/\//g, '.'), {});
	}

	directoryRemoved({path}) {
		this.mount.removeTreeEntry(path);
		if(path === '/') {
			this.structure = {};
		}
		dotProp.delete(this.structure, path.slice(1).replace(/\//g, '.'));
		delete this.attrList[path];
	}

	fileRenamed({source, destination}) {
		console.log('structure:', JSON.stringify(this.structure));
		if(dotProp.get(this.structure, source.slice(1).replace(/\//g, '.'))) {
			console.log("rename dir:", source, destination);
			this.mount.renameTreeEntry(source, destination);
			dotProp.set(this.structure,
				destination.slice(1).replace(/\//g, '.'),
				dotProp.get(this.structure, source.slice(1).replace(/\//g, '.'))
			);
			dotProp.delete(this.structure, source.slice(1).replace(/\//g, '.'));
			this.attrList[destination] = this.attrList[source];
			delete this.attrList[source];
		}
	}

	getPathAttr(path) {
		return this.attrList[path];
	}

	getPath(path) {
		if(path === '/') {
			return Object.keys(this.structure);
		}
		return Object.keys(dotProp.get(this.structure, path.slice(1).replace(/\//g, '.')));
	}

}

module.exports = DirectoryStructure;
module.exports.inject = ['Mount'];
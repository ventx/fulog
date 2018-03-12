const AbstractProjector = require('./AbstractProjector');
const dotProp = require('dot-prop');
const FileTypes = require('../helper/FileTypes');

/**
 * Represents a directory structure. One of these is created for each fulog managed directory.
 * @author Wolfgang Felbermeier (@f3lang)
 */
class DirectoryStructure extends AbstractProjector {

	constructor() {
		super('directory');
		this.structure = {};
		this.attrList = {};
		this.loadEventStream();
	}

	directoryCreated({path, mode}) {
		if(!this.attrList[path]) {
			this.attrList[path] = {mode: mode + FileTypes.DIRECTORY};
		} else {
			this.attrList[path].mode = mode + FileTypes.DIRECTORY;
		}
		dotProp.set(this.structure, path.slice(1).replace(/\//g, '.'), {});
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
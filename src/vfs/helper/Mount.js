const dotProp = require('dot-prop');

/**
 * This class keeps track of the directory tree. It has no knowledge whether an entry
 * is a file, symlink, directory whatsoever
 * @author Wolfgang Felbermeier (@f3lang)
 */
class Mount {

	constructor() {
		this.structure = {};
	}

	createTreeEntry(path) {
		dotProp.set(this.structure, path.slice(1).replace(/\//g, '.'), {});
	}

	removeTreeEntry(path) {
		dotProp.delete(this.structure, path.slice(1).replace(/\//g, '.'));
	}

	renameTreeEntra(oldPath, newPath) {
		dotProp.set(this.structure,
			newPath.slice(1).replace(/\//g, '.'),
			dotProp.get(this.structure, oldPath.slice(1).replace(/\//g, '.'))
		);
		dotProp.delete(this.structure, oldPath.slice(1).replace(/\//g, '.'));
	}

	getDirectoryContent(path) {
		if(path === '/') {
			return Object.keys(this.structure);
		} else {
			return Object.keys(dotProp.get(this.structure, path.slice(1).replace(/\//g, '.')));
		}
	}

}

module.exports = Mount;
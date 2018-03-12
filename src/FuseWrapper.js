class FuseWrapper {

	/**
	 *
	 * @param {EventStorage} eventStorage
	 * @param {DirectoryStructure} directoryStructure
	 */
	constructor(eventStorage, directoryStructure) {
		this.directory = module.exports.tree;
		this.eventStorage = eventStorage;
		this.directoryStructure = directoryStructure;
	}

	createDirectory(path, mode, cb) {
		this.eventStorage.commit('DirectoryCreated', path, mode).then(() => {
			cb(0)
		});
	}

	removeDirectory(path, cb) {
		this.eventStorage.commit('DirectoryRemoved', path).then(() => {
			console.log("removed dir, calling callback");
			cb(0);
		})
	}

	getDirectoryContent(path, cb) {
		let dirs = this.directoryStructure.getPath(path);
		console.log("available dirs:", dirs);
		cb(0, this.directoryStructure.getPath(path));
	}

	getPathAttr(path) {
		return this.directoryStructure.getPathAttr(path);
	}

}

module.exports = FuseWrapper;
module.exports.inject = ['EventStorage', 'DirectoryStructure'];
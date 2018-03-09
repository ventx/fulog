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
		console.log("create path:", path);

		this.eventStorage.commit('DirectoryCreated', path, mode).then(() => {
			console.log("finished and called callback");
			cb(0)
		});
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
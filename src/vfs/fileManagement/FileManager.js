/**
 * The File Manager manages the actual content of the files.
 * It basically offers a key value store with CRUD operations.
 * Files are stored locally since we just cannot fit all files in
 * memory. Would be fast, but hey, you don't want 50GB memory blocked
 * by logfiles, don't you?
 * It has no knowledge about any hierarchy in the vfs and only
 * handles files based on their uuid.
 *
 * @author Wolfgang Felbermeier (@f3lang)
 */
class FileManager {

	/**
	 *
	 * @param  {EventStorage} eventStorage
	 * @param {String} cacheLocation
	 */
	constructor(eventStorage, cacheLocation) {
		this.fileMap = {};
		this.eventStorage = eventStorage;
	}

	createFile(id) {
		this.fileMap[id] = [];
		let fileStream = this.eventStorage.getEventStore().createEventStream(id, () => true);
		let consumer = this.eventStorage.getEventStore().getConsumer(id, 'file-manager');
		consumer.on('data', event => {
			let type = event.__type;
			let id = event.__id;
		});
	}

	updateFile({id, position, bytes}) {
	}

	deleteFile() {
		this.eventStorage.getEventStore().deleteEventStream(id);
	}

}

module.exports = FileManager;
module.exports.inject = ['EventStorage', 'config:fulog:cacheLocation'];
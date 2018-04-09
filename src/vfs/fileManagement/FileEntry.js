const path = require('path');
const fs = require('fs');


class FileEntry {

	/**
	 *
	 * @param cacheLocation
	 * @param id
	 * @param {EventStore} eventStore
	 */
	constructor(cacheLocation, id, eventStore) {
		this.path = path.join(cacheLocation, id);
		let filestatusPath = path.join(cacheLocation, id, 'fileinfo.json');
		this.filestatus = fs.existsSync(filestatusPath) ? require(filestatusPath) : {lastRevision: 0};
		this.eventStream = eventStore.getEventStream(id, this.filestatus.lastRevision);
		this.file = fs.open(path, 'rw');
	}

}

module.exports = FileEntry;
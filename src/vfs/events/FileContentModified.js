const AbstractEvent = require('./AbstractEvent');

class FileContentModified extends AbstractEvent {

	constructor(filename, location, content) {
		super(['file']);
		this.filename = filename;
		this.location = location;
		this.content = content;
	}

}

module.exports = FileContentModified;
const AbstractEvent = require('./AbstractEvent');

class FileCreated extends AbstractEvent {

	constructor(path, mode) {
		super(['file']);
		this.path = path;
		this.mode = mode;
	}

}

module.exports = FileCreated;
const AbstractEvent = require('./AbstractEvent');

class FileCreated extends AbstractEvent {

	constructor(path) {
		super(path);
		this.path = path;
	}

}

module.exports = FileCreated;
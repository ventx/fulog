const AbstractEvent = require('./AbstractEvent');

class DirectoryCreated extends AbstractEvent {

	constructor(path, mode) {
		super(['directory']);
		this.path = path;
		this.mode = mode;
	}

}

module.exports = DirectoryCreated;
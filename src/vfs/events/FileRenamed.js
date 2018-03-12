const AbstractEvent = require('./AbstractEvent');

class FileRenamed extends AbstractEvent {

	constructor(source, destination) {
		super(['fs']);
		this.source = source;
		this.destination = destination;
	}

}

module.exports = FileRenamed;
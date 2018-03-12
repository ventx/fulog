const AbstractEvent = require('./AbstractEvent');

class FileLinked extends AbstractEvent {

	constructor(source, destination) {
		super(['fs']);
		this.source = source;
		this.destination = destination;
	}

}

module.exports = FileLinked;


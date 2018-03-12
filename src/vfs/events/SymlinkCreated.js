const AbstractEvent = require('./AbstractEvent');

class SymlinkCreated extends AbstractEvent {

	constructor(source, destination) {
		super(['symlink']);
		this.source = source;
		this.destination = destination;
	}

}

module.exports = SymlinkCreated;
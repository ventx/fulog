const AbstractEvent = require('./AbstractEvent');

class FileUnlinked extends AbstractEvent {

	constructor(path) {
		super(['fs']);
		this.path = path;
	}

}

module.exports = FileUnlinked;
const AbstractEvent = require('./AbstractEvent');

class DirectoryRemoved extends AbstractEvent{

	constructor(path) {
		super(['directory', 'fs']);
		this.path = path;
	}

}
module.exports = DirectoryRemoved;
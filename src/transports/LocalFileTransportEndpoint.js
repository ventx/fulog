const AbstractTransportEndpoint = require('./AbstractTransportEndpoint');
const fs = require('fs');

class LocalFileTransportEndpoint extends AbstractTransportEndpoint {

	constructor(config) {
		super(config);
		if(!config.root) {
			throw new Error('[fulog] [Error] No root directory configured for LocalFileTransportEndpoint');
		}
		this.root = config.root;
		this.files = {};
	}

	/**
	 * Will walk through a directory and build internal file descriptors for every file.
	 * The file descriptors will afterwards reside in the files property of this class.
	 * @param {String} root The root to walk through
	 */
	parseRootContent(root) {
		
	}

	write(path, bytes, location) {

	}

}

module.exports = LocalFileTransportEndpoint;
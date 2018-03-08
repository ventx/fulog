const AbstractTransportEndpoint = require('./AbstractTransportEndpoint');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

class S3TransportEndpoint extends AbstractTransportEndpoint{

	constructor(config) {
		super(config);
		switch(config.mode) {
			case 'filestream':
				break;
			case 'sectorStorage':
				break;
		}
	}

}

module.exports = S3TransportEndpoint;
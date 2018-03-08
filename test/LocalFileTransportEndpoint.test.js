const expect = require('chai').expect;
const LocalFileTransportEndpoint = require('../src/transports/LocalFileTransportEndpoint');
const path = require('path');

const root = path.join(__dirname, 'mock', 'fileroot');

describe("Local File Transport Endpoint", function () {

	it("will parse the existing content of the root", function () {
		let endpoint = new LocalFileTransportEndpoint({root});
		expect(endpoint.files[path.join(root, 'dummyfile.txt')]).to.exist;
	});

});
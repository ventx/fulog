const expect = require('chai').expect;
const eventWrapper = require('../src/vfs/events/');


describe("Virtual File System", function () {

	describe("Events", function () {

		it("dynamic resolution of events works", function () {
			let directoryCreated = eventWrapper('DirectoryCreated', 'blubb', 'blargh');
		});

	});

});
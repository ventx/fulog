const expect = require('chai').expect;
const eventWrapper = require('../src/vfs/events/');
const DirectoryStructure = require('../src/vfs/projectors/DirectoryStructure');


const AbstractProjectorMock = class {

	constructor(){
	}

};

describe("Virtual File System", function () {

	describe("Events", function () {

		it("dynamic resolution of events works", function () {
			let directoryCreated = eventWrapper('DirectoryCreated', 'blubb', 'blargh');
		});

	});

	describe("Directory Structure", function () {

		it("can create a directory", function(){
			Object.setPrototypeOf(DirectoryStructure, AbstractProjectorMock);
			let directoryStructure = new DirectoryStructure();
			directoryStructure.directoryCreated({path: '/bananarama/flurb', mode: 509});
			expect(directoryStructure.getPath('/bananarama')).to.eql(['flurb']);
		});

	});

});
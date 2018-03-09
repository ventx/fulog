const path = require('path');

let fuseConfig = {
	mountPoints: [
		path.join(__dirname, 'mnt')
	]
};

let fulogConfig = {
	eventStore: {
		location: path.join(__dirname, 'dev', 'eventstore')
	}
};

const Fulog = require('./src/FuseManager');
const cdi = require('cdi');

let objectManager = new cdi({
	moduleSrc: [path.join(__dirname, 'src')],
	configurations: {
		fuse: fuseConfig,
		fulog: fulogConfig
	}
});

let fuseManager = objectManager.getInstance('FuseManager');

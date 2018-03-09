const EventStore = require('event-storage');
const eventWrapper = require('./events');
const path = require('path');
const md5 = require('md5');

class EventStorage {

	constructor(location) {
		this.fuseScopeId = md5(module.exports.tree);
		this.eventstore = new EventStore('fulog', {storageDirectory: path.join(location, this.fuseScopeId)});
		this.ready = new Promise((resolve, reject) => this.eventstore.on('ready', () => resolve(this.eventstore)));
	}

	commit(name, ...args) {
		return new Promise((resolve, reject) => {
			let event = eventWrapper(name, ...args);
			event.__eventName = event.constructor.name;
			this.eventstore.commit(event._streamName, event, () => {
				resolve();
			});
		});
	}

	/**
	 *
	 * @return {EventStore}
	 */
	getEventStore() {
		return this.eventstore;
	}

}

module.exports = EventStorage;
module.exports.inject = ['config:fulog:eventStore.location'];
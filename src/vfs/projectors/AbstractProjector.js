const uuid = require('uuid').v4;

class AbstractProjector {

	/**
	 * @param {EventStorage} eventStorage
	 * @param streamName
	 */
	constructor(eventStorage, streamName) {
		this._id = uuid();
		this.eventStorage = eventStorage;
		this.streamName = streamName;
	}

	loadEventStream() {
		let stream = this.eventStorage.getEventStore().getEventStream(this.streamName);
		if(!stream) {
			this.eventStorage.getEventStore().createEventStream(this.streamName, () => true);
		}
		let consumer = this.eventStorage.getEventStore().getConsumer(this.streamName, this._id);
		consumer.on('data', event => {
			this.applyEvent(event);
		});
	}

	/**
	 * Applies an event on the current projector
	 * @param {AbstractEvent} event
	 */
	applyEvent(event) {
		console.log("apply Event:", event);
		let targetMethod = event.__eventName.charAt(0).toLowerCase() + event.__eventName.slice(1);
		if (this[targetMethod]) {
			this[targetMethod](event);
		}
	}

}

module.exports = AbstractProjector;
module.exports.inject = ['EventStorage'];
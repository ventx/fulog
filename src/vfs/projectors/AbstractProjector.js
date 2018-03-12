const uuid = require('uuid').v4;

class AbstractProjector {

	/**
	 * @param {EventStorage} eventStorage
	 * @param streamNames
	 */
	constructor(eventStorage, streamNames) {
		this._id = uuid();
		this.eventStorage = eventStorage;
		this.streamNames = streamNames;
	}

	loadEventStreams() {
		this.streamNames.forEach(streamName => {
			let stream = this.eventStorage.getEventStore().getEventStream(streamName);
			if(!stream) {
				this.eventStorage.getEventStore().createEventStream(streamName, () => true);
			}
			let consumer = this.eventStorage.getEventStore().getConsumer(streamName, this._id);
			consumer.on('data', event => {
				this.applyEvent(event);
			});
		})
	}

	/**
	 * Applies an event on the current projector
	 * @param {AbstractEvent} event
	 */
	applyEvent(event) {
		let targetMethod = event.__eventName.charAt(0).toLowerCase() + event.__eventName.slice(1);
		if (this[targetMethod]) {
			this[targetMethod](event);
		}
	}

}

module.exports = AbstractProjector;
module.exports.inject = ['EventStorage'];
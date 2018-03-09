const uuid = require('uuid').v4;

class AbstractProjector {

	/**
	 * @param {EventStorage} eventStorage
	 * @param streamName
	 */
	constructor(eventStorage, streamName) {
		this._id = uuid();
		let stream = eventStorage.getEventStore().getEventStream(streamName);
		if(!stream) {
			eventStorage.getEventStore().createEventStream(streamName, () => true);
		}
		let consumer = eventStorage.getEventStore().getConsumer(streamName, this._id);
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
		let targetMethod = event.constructor.name.charAt(0).toLowerCase() + event.constructor.name.slice(1);
		if (this[targetMethod]) {
			this[targetMethod](event);
		}
	}

}

module.exports = AbstractProjector;
module.exports.inject = ['EventStorage'];
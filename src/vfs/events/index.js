/**
 * Wrapper for events, so we do not need to load every event
 * as a separate class.
 * @param {String} identifier The identifier of the event. Must match the class name
 * @param {object} args The arguments to hand over to the event
 * @return {AbstractEvent}
 */
module.exports = (identifier, ...args) => {
	let event = require('./' + identifier);
	return new event(...args);
};
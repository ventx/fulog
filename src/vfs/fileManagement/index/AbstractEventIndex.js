/**
 * This helps you getting file contents faster.
 * not enough? ok...
 * So log files are those type of files that just keep growing and growing and on and on.
 * If you don't activate something fancy like logrotate you gonna end up with some pretty
 * big files (GB or more). And due to our event driven storage system this also means a few
 * million or even billion events. We could iterate through all those events and get the
 * suitable ones, resulting in merely a few minutes of access latency. Whereas this might
 * sound like an amazingly fast computer for lets say 1960, today it is not.
 * So we need an index over the events to be able to resolve events for file positions quickly and
 * stay in our comfortable sub ms latency.
 * @author Wolfgang Felbermeier (@f3lang)
 */
class AbstractEventIndex {

	constructor(eventStorage){
		this.eventStorage = eventStorage;
	}

	/**
	 * Returns a list of all events, that changed the data in the defined range
	 * @param {Integer} position The start Position of the range
	 * @param {Integer} length The length of the range
	 */
	getEventsAtRange(position, length) {
	}

	changeFileContent({location, content}) {
	}

}

module.exports = AbstractEventIndex;
module.exports.inject = ["EventStorage:root"];
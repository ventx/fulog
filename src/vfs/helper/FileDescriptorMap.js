/**
 * Keeps track of all active file descriptors and therefore helps to
 * keep away the file descriptors from the event store.
 * @author Wolfgang Felbermeier (@f3lang)
 */
class FileDescriptorMap {

	constructor() {
		this.activeDescriptors = [];
		this.freeDescriptors = [];
		this.lastDescriptor = 0;
	}

	requestDescriptor(path, mode) {
		if (this.freeDescriptors.length > 0) {
			let dscr = this.freeDescriptors.shift();
			this.activeDescriptors[dscr] = {path, mode};
			return dscr;
		}
		let dscr = ++this.lastDescriptor;
		this.activeDescriptors[dscr] = {path, mode};
		return dscr;
	}

	getDescriptor(dscr) {
		return this.activeDescriptors[dscr];
	}

	removeDescriptor(dscr) {
		delete this.activeDescriptors[dscr];
		this.freeDescriptors.push(dscr);
	}

}

module.exports = FileDescriptorMap;
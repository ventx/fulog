/**
 * The Fuse Manager will create the mountpoints and
 */
class FuseManager {

	constructor(mountPoints) {
		this.mountPoints = mountPoints;
	}

}

module.exports = FuseManager;
module.exports.inject = ['config:fuse:mountPoints'];
/**
 * The Fuse Manager will create the mountpoints and
 */
class FuseManager {

	constructor(objectManager, mountPoints) {
		this.mountPoints = mountPoints;
		this.fuseWrappers = this.mountPoints.map(mp => {
			objectManager.getInstance('FuseDriver', mp);
		});
	}


}

module.exports = FuseManager;
module.exports.inject = ['ObjectManager', 'config:fuse:mountPoints'];
/**
 * Little helper for the linux file types
 * @author Wolfgang Felbermeier (@f3lang)
 */

module.exports = {
	DIRECTORY: 0o40000,
	CHARACTER_DEVICE: 0o20000,
	BLOCK_DEVICE: 0o60000,
	FILE: 0o100000,
	FIFO: 0o10000,
	SYM_LINK: 0o120000,
	SOCKEt: 0o140000
};
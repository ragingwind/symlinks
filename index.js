'use strict';

const fs = require('fs');
const path = require('path');
const globby = require('globby');
const pify = require('pify');

const pFs = pify(fs);

function existsTarget(target, unlink) {
	return globby(target).then(files => {
		files.forEach(f => {
			if (unlink) {
				console.log(`Unlink ${f}`);
				pFs.unlinkSync(f);
			} else {
				console.log(`Backup from ${f} to ${f}.bak`);
				pFs.renameSync(f, `${f}.bak`);
			}
		});
	});
}

function createSymlink(patterns, dest, filter, opts) {
	return globby(patterns).then(pattern => {
		return Promise.all(pattern.map(src => {
			let target = path.basename(src);

			if (filter) {
				target = filter(target);
			}

			const symlink = path.join(path.resolve(dest), target);

			return existsTarget(symlink, opts.unlink).then(() => {
				pFs.symlink(path.resolve(src), symlink);
				return symlink;
			});
		}));
	});
}

module.exports = (patterns, dest, filter, opts) => {
	if (!patterns || !dest) {
		throw new Error('Patterns and Destination should be passed');
	}

	if (filter) {
		if (typeof filter === 'object') {
			opts = filter;
			filter = null;
		} else if (typeof filter !== 'function') {
			throw new Error('filter parameter should be function');
		}
	}

	if (!Array.isArray(patterns)) {
		patterns = [patterns];
	}

	opts = Object.assign({
		unlink: false
	}, opts);

	return createSymlink(patterns, path.resolve(dest), filter, opts);
};

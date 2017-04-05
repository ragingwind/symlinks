import path from 'path';
import test from 'ava';
import osRandTmpDir from 'os-random-tmpdir';
import mkdirp from 'mkdirp';
import symlinks from './';

test('Creat symlinks', async t => {
	const dest = osRandTmpDir('symlinks');
	mkdirp.sync(dest);

	await symlinks(['*.js', 'readme.md'], dest).then(links => {
		links = links.map(link => link.replace(dest, ''));
		t.true(links.indexOf('/index.js') >= 0);
		t.true(links.indexOf('/test.js') >= 0);
		t.true(links.indexOf('/readme.md') >= 0);
	});
});

test('Creat symlinks with filter', async t => {
	const dest = osRandTmpDir('symlinks');
	mkdirp.sync(dest);

	const hidden = f => `.${path.basename(f, path.extname(f))}`;

	await symlinks(['*.js', 'readme.md'], dest, hidden).then(links => {
		links = links.map(link => link.replace(dest, ''));

		t.true(links.indexOf('/.index') >= 0);
		t.true(links.indexOf('/.test') >= 0);
		t.true(links.indexOf('/.readme') >= 0);
	});
});

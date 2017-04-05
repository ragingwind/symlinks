# symlinks [![Build Status](https://travis-ci.org/ragingwind/symlinks.svg?branch=master)](https://travis-ci.org/ragingwind/symlinks)

> Create symlinks in a safe way


## Install

```
$ npm install --save symlinks
```


## Usage

```js
const symlinks = require('symlinks');

symlinks(['~/.dotfiles/**/*.symlink', '~/Downloads/local/*'], $HOME).then(links) {
}
```

## API

### symlinks(patterns, dest, [options])

Return a Promise for an array of creating symbolic links

#### patterns

Type: `string` or `array`

Pattern of [globby](https://github.com/sindresorhus/globby) for Source files to become a symbolic link, 

#### dest

Type: `string`

Path for root directory for symbolic links

#### options

##### unlink

Type: `boolean`<br>
Default: `false`

Whether unlink exists symbolic link or not

## License

MIT © [Jimmy Moon](http://ragingwind.me)

# extract-sourcemap
[![npm](https://img.shields.io/npm/v/extract-sourcemap.svg)](https://www.npmjs.com/package/extract-sourcemap)
[![Build Status](https://travis-ci.org/faucet-pipeline/extract-sourcemap.svg?branch=master)](https://travis-ci.org/faucet-pipeline/extract-sourcemap)
[![Greenkeeper badge](https://badges.greenkeeper.io/faucet-pipeline/extract-sourcemap.svg)](https://greenkeeper.io)

Extract the sourcemap from a JS or CSS file

## Usage via CLI

Provide the name of the file you want to extract the sourcemap from, then
provide the keys of the sourcemap you want to extract:

```
extract-sourcemap index.js version
```

This will output the sourcemap in JSON format:

```json
{"version":3}
```

## Usage as a library

Provide the source you want to extract the sourcemap from as a String or Buffer
and provide the keys of the sourcemap you want to extract as an array:

```js
let extractSourcemap = require("extract-sourcemap");

let source = "...";
let map = extractSourcemap(source, ["version"]);
```

You will get back the sourcemap as an Object.

## License

extract-sourcemap is licensed under MPL-2.0 License.

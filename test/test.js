/* global describe, it */
"use strict";

let extractSourcemap = require("..");
let assert = require("assert");

describe("extract-sourcemap", _ => {
	it("extracts a sourcemap with charset", () => {
		let map = extractSourcemap(`${__dirname}/bundle-with-charset.css`, ["version"]);
		assert.strictEqual(map, '{"version":3}');
	});

	it("extracts a sourcemap without charset", () => {
		let map = extractSourcemap(`${__dirname}/bundle-without-charset.css`, ["version"]);
		assert.strictEqual(map, '{"version":3}');
	});

	it("fails to extract a sourcemap without base64 content", () => {
		assert.throws(() => extractSourcemap(`${__dirname}/bundle-without-base64.css`, ["version"]), Error, "No Source Map found");
	});

	it("fails to extract a missing sourcemap", () => {
		assert.throws(() => extractSourcemap(`${__dirname}/bundle-without-sourcemap.css`, ["version"]), Error, "No Source Map found");
	});
});

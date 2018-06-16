/* global describe, it */
"use strict";

let extractSourcemap = require(".");
let assert = require("assert");

describe("extract-sourcemap", _ => {
	it("extracts a sourcemap with charset", () => {
		let source = `
			.blubb {
			  display: -ms-flexbox;
			  display: flex; }

			.bla {
			  color: green; }
			/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zcmMvaW5kZXguc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNDLHFCQUFhO0VBQWIsY0FBYSxFQUNiOztBQUVEO0VBQ0MsYUFQWSxFQVFaIiwiZmlsZSI6InNyYy9pbmRleC5zY3NzIn0= */
		`;
		let map = extractSourcemap(source, ["version"]);
		assert.deepEqual(map, { "version": 3 });
	});

	it("extracts a sourcemap without charset", () => {
		let source = `
			.blubb {
			  display: -ms-flexbox;
			  display: flex; }

			.bla {
			  color: green; }
			/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zcmMvaW5kZXguc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNDLHFCQUFhO0VBQWIsY0FBYSxFQUNiOztBQUVEO0VBQ0MsYUFQWSxFQVFaIiwiZmlsZSI6InNyYy9pbmRleC5zY3NzIn0= */
		`;
		let map = extractSourcemap(source, ["version"]);
		assert.deepEqual(map, { "version": 3 });
	});

	it("fails to extract a sourcemap without base64 content", () => {
		let source = `
			.blubb {
			  display: -ms-flexbox;
			  display: flex; }

			.bla {
			  color: green; }
			/*# sourceMappingURL=data:application/json;,"This is not base64" */
		`;
		assert.throws(() => extractSourcemap(source, ["version"]), Error, "No Source Map found");
	});

	it("fails to extract a missing sourcemap", () => {
		let source = `
			.blubb {
			  display: -ms-flexbox;
			  display: flex; }

			.bla {
			  color: green; }
		`;
		assert.throws(() => extractSourcemap(source, ["version"]), Error, "No Source Map found");
	});
});

let { readFileSync } = require("fs");
let regex = /sourceMappingURL=data:application\/json;(?:charset=utf-8;)base64,(\S+)/;

module.exports = (fileName, attributes) => {
	let result = regex.exec(readFileSync(fileName));
	if(!result) {
		throw new Error("No Source Map found");
	}
	let sourceMapBuffer = Buffer.from(result[1], "base64");
	let sourceMap = JSON.parse(sourceMapBuffer);
	Object.keys(sourceMap).
		filter(key => !attributes.includes(key)).
		forEach(key => delete sourceMap[key]);
	return JSON.stringify(sourceMap);
};

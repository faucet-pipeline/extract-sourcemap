let { readFileSync } = require("fs");
let findUrl = /sourceMappingURL=data:(\S+)/;
let findMap = /;base64,(\S+)$/;

module.exports = (fileName, attributes) => {
	let url = firstMatchedGroup(findUrl, readFileSync(fileName));
	let map = firstMatchedGroup(findMap, url);
	if(!map) {
		throw new Error("No Source Map found");
	}
	let sourceMapBuffer = Buffer.from(map, "base64");
	let sourceMap = JSON.parse(sourceMapBuffer);
	Object.keys(sourceMap).
		filter(key => !attributes.includes(key)).
		forEach(key => delete sourceMap[key]);
	return JSON.stringify(sourceMap);
};

function firstMatchedGroup(regex, data) {
	let matches = regex.exec(data);
	if(!matches) {
		return null;
	}
	return matches[1];
}

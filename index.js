let findUrl = /sourceMappingURL=data:(\S+)/;
let findMap = /;base64,(\S+)$/;

module.exports = (source, attributes) => {
	let url = firstMatchedGroup(findUrl, source);
	let map = firstMatchedGroup(findMap, url);
	if(!map) {
		throw new Error("No Source Map found");
	}
	let sourceMapBuffer = Buffer.from(map, "base64");
	let sourceMap = JSON.parse(sourceMapBuffer);
	Object.keys(sourceMap).
		filter(key => !attributes.includes(key)).
		forEach(key => delete sourceMap[key]);
	return sourceMap;
};

function firstMatchedGroup(regex, data) {
	let matches = regex.exec(data);
	if(!matches) {
		return null;
	}
	return matches[1];
}

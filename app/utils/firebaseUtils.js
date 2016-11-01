export function mergeArrayObjectWithKey(obj) {
	if (!(obj instanceof Object)) return obj;
	return Object.keys(obj).map(function(key) {
		return Object.defineProperty(obj[key], 'key', {
			__proto__: null,
			value: key
		});
	});
}
;(function(window,undefined){
	const ttFunc = function testFunction(
		obj,
		v = 'ylone',
		) {
		let hello = obj.hello || 'Hi';
		let world = obj.world || 'China';
		const str = `${hello}, ${world}! ${v} is cool!`;
		alert(str);
	};
	const testData = {};
	testData.hello = 'hello';
	testData.world = 'world';
	ttFunc(testData);
})(window);
;(function (window, undefined) {
	var ttFunc = function () {
		function testFunction(obj) {
			var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ylone';

			var hello = obj.hello || 'Hi';
			var world = obj.world || 'China';
			var str = String(hello) + ', ' + String(world) + '! ' + String(v) + ' is cool!';
			alert(str);
		}

		return testFunction;
	}();
	var testData = {};
	testData.hello = 'hello';
	testData.world = 'world';
	ttFunc(testData);
})(window);
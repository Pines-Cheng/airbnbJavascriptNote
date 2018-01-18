;(function (window, undefined) {
	var hello = function () {
		function testHelloWorld() {
			var str = 'hello';
			var strHello = str + ',world';
			alert(strHello);
		}

		return testHelloWorld;
	}();
	hello();
})(window);
;
(function (window, undefined) {
	input.map(function (item) {
		return item + 1;
	});
})(window);

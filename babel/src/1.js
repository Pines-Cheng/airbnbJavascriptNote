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
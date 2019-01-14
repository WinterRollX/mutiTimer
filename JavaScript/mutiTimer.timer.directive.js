(function () {
	angular.module("mutiTimer").directive("timer", function () {
		return {
			restrict : "E",
			templateUrl : "HTML/mutiTimer.timer.template.html",
			scope : {
				title : "<",
				deleteTimer : "&",
				timerID : "="
			},
			controller : "timerController"
		};

	});

})();
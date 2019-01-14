(function () {
	let myApp = angular.module("mutiTimer");
	myApp.controller("mainController",mainControllerFun);

	mainControllerFun.$inject = ["$scope"];
	function mainControllerFun($scope) {
		$scope.tempTimerName = " Name the new timer";
		$scope.timerList = [
		{timerName: "test timer 1",hour:0,minute:1,second:8}, 
		{timerName: "test timer 2",hour:0,minute:2,second:0}
		];
		$scope.deleteTimer = function (index) {
			$scope.timerList.splice(index,1);
		}
		$scope.addTimer = function (title,hour,minute,second) {
			let tempObj = {};
			tempObj.timerName = title;
			tempObj.hour = hour;
			tempObj.minute = minute;
			tempObj.second = second;
			$scope.timerList.push(tempObj);
		}
		$scope.onAddTimer = function () {
			let hour = 0;
			let minute = 0;
			let second = 0;
			if($scope.tempTimerName !== null || $scope.tempTimerName !== undefined){
				$scope.addTimer($scope.tempTimerName,hour,minute,second);
			}
		}
	}
})();
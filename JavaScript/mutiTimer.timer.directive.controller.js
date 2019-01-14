(function () {
	// timer directive controller.
	angular.module("mutiTimer").controller("timerController",timerControllerFun);
	
	timerControllerFun.$inject = ["$scope","$element","$interval"];
	function timerControllerFun($scope,$element,$interval) {

		$scope.testString = "Nice to meet you little bear.";
		$scope.timeDisplay = "000 : 00 : 00";
		$scope.timerState = 0; // 0 = init, 1 = start 2 = paused 3 = alert
		$scope.buttonCaption = ["Start","Pause","Resume","Got it!"];
		$scope.timeLeft = 0;
		$scope.hour = 0;
		$scope.minute = 0;
		$scope.second = 0;
		$scope.intervalID = -1;
		$scope.startButtonCaption = "Start";
		$scope.resetButtonCaption = "Reset";
		$scope.ID = 0;

		// UI functions.
		$scope.onClickDelete = function () {
			$scope.deleteTimer( {timerID:$scope.timerID});
		}
		$scope.checkData = function () {
			if($scope.hour > 999) {
				$scope.hour = 999;
			}
			if ($scope.hour < 0 ){
				$scope.hour = 0;
			}
			if($scope.minute > 59) {
				$scope.minute = 59;
			}
			if ($scope.minute < 0 ){
				$scope.minute = 0;
			}
			if($scope.second > 59) {
				$scope.second = 59;
			}
			if ($scope.second < 0 ){
				$scope.second = 0;
			}
			$scope.timeLeft = $scope.hour * 3600 + $scope.minute * 60 + $scope.second;
			$scope.updateDisplay();
		}
		$scope.onClickStart = function () {
			// TODO check data and states
			switch($scope.timerState){
				case 0:
				case 2:
				//start timer
				if($scope.timerState === 0){
					$scope.checkData();
					$scope.disableInput();
				}
				$scope.timerState = 1;
				$scope.updateDisplay();
				$scope.intervalID = $interval($scope.doTick,1000);
				break;
				case 1:
				// pause timer
				$interval.cancel($scope.intervalID);
				$scope.timerState = 2;
				$scope.updateDisplay();
				break;
				case 3:
				// stop alert, reset timer.
				$scope.resetTimer();
				break;
			}

		}
		$scope.resetTimer = function () {
			// cancle interval
			if($scope.intervalID !== -1){
				$interval.cancel($scope.intervalID);
				$scope.intervalID = -1;
			}
			$scope.stopAlert();
			$scope.enableInput();
			$scope.timerState = 0; 
			$scope.checkData();
		}

		$scope.doTick = function () {
			// code run at each tick.
			$scope.timeLeft -= 1;
			$scope.updateDisplay();
			if($scope.timeLeft === 0 ){
				// time up, fire alert!
				$interval.cancel($scope.intervalID);
				$scope.timerState = 3;
				$scope.updateDisplay();
				$scope.playAlert();
			}
		}
		$scope.disableInput = function () {
			let DOMs = $element.find("input");
			for(let i=0;i<DOMs.length;i++){
				DOMs[i].disabled = true;
			}
		}
		$scope.enableInput = function () {
			let DOMs = $element.find("input");
			for(let i=0;i<DOMs.length;i++){
				DOMs[i].disabled = false;
			}
		}
		$scope.playAlert = function () {
			// play alert sound
			var elems =$element.find('span')
    		angular.forEach(elems,function(v,k){
    			if(angular.element(v).hasClass('timer-display-text')){
		    	angular.element(v).toggleClass( "timer-in-alert" );
			}});
			$element.find("audio")[0].play();
		}
		$scope.stopAlert = function () {
			// stop play alert sound
			var elems =$element.find('span')
    		angular.forEach(elems,function(v,k){
    			if(angular.element(v).hasClass('timer-display-text')){
		    	angular.element(v).toggleClass( "timer-in-alert" );
			}});
			$element.find("audio")[0].pause();
		}
		$scope.updateDisplay = function () {
			$scope.timeDisplay = $scope.getTimeString($scope.timeLeft);
			$scope.startButtonCaption = $scope.buttonCaption[$scope.timerState];
		}
		
		// support functions.
		$scope.getTimeString = function (timeLeft) {
			// get formated time string in HH:MM:SS
			let totalSec = timeLeft;
			let hours = "";
			let minutes = "";
			let seconds = "";
			hours = toFixedLength(Math.floor(totalSec / 3600).toString(),3);
			totalSec = totalSec % 3600;
			minutes = toFixedLength(Math.floor(totalSec / 60).toString(),2);
			totalSec = totalSec % 60;
			seconds = toFixedLength(totalSec.toString(),2);
			return hours + " : " + minutes + " : " + seconds;
			function toFixedLength(string,length) {
				if(string.length < length){
					for(let i = length - string.length;i>0;i--){
						string = "0" + string;
					}
				}
				return string;
			}
		}
		
	}

})();
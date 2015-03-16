(function(angular) {
	'use strict';

	angular.module('app.GameState', [])
		.constant('gameConfig', {
			moveInterval: 100,
			moveDistance: 10,
			containerWidth: 1000,
			initialTickInterval: 1000,
			tickIntervalChangeMultiplier: 0.9,
			numberNeededToChangeTick: 20,
			correctScore: 1,
			incorrectScore: -1
		})
		.factory('gameState', ['$timeout', 'gameConfig', function($timeout, gameConfig) {
			var that = this;

			var currentTickInterval = gameConfig.initialTickInterval;
			var correctLetters = 0;
			this.gameRunning = false;
			this.score = 0;
			this.letters = [];
			this.containerWidth = gameConfig.containerWidth;

			function addLetter() {
				that.letters.push({
					letter: String.fromCharCode(Math.floor(Math.random() * 26) + 65), // random character a-z
					left: 0
				});
			}

			function moveLetters() {
				for (var i = 0; i < that.letters.length; i++) {
					var current = that.letters[i];

					current.left += gameConfig.moveDistance;
					if (current.left >= gameConfig.containerWidth) {
						that.gameRunning = false;
					}
				}
			}

			function startGame() {
				correctLetters = 0;
				currentTickInterval = gameConfig.initialTickInterval;
				that.score = 0;
				that.letters = [];
				that.gameRunning = true;

				function moveWrapper() {
					moveLetters();

					if (that.gameRunning) {
						$timeout(moveWrapper, gameConfig.moveInterval);
					}
				}
				moveWrapper();

				function tick() {
					if (that.gameRunning) {
						addLetter();
						$timeout(tick, currentTickInterval);
					}
				}
				tick();
			}

			this.handleKey = function handleKey(keyCode) {
				if (keyCode === 27) { //escape
					that.gameRunning = false;
				}

				if (keyCode === 32) { //space
					startGame();
				}

				if (keyCode >= 65 && keyCode <= 90) { //a-z
					var letter = String.fromCharCode(keyCode);

					var found = false;
					for (var i = 0; i < that.letters.length; i++) {
						var current = that.letters[i];
						if (current.letter === letter) {
							that.letters.splice(i, 1);
							found = true;
							break;
						}
					}

					if (found) {
						that.score += gameConfig.correctScore;
						correctLetters++;
						if (correctLetters % gameConfig.numberNeededToChangeTick === 0) {
							currentTickInterval *= gameConfig.tickIntervalChangeMultiplier;
						}
					}
					else {
						that.score += gameConfig.incorrectScore;
					}
				}
			};

			return this;
	}]);
})(window.angular);

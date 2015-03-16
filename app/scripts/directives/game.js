(function(angular) {
	'use strict';

	angular.module('app.Game', ['app.GameState'])
		.controller('app.GameController', ['gameState', function(gameState) {
			this.state = gameState;
		}])
		.directive('game', function() {
			return {
				restrict: 'E',
				templateUrl: 'views/game.html',
				controller: 'app.GameController',
				controllerAs: 'ctrl'
			};
		});
})(window.angular);

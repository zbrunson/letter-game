(function(angular) {
	'use strict';

	angular.module('app.GameBodyCtrl', ['app.GameState'])
		.controller('GameBodyController', ['gameState', function(gameState) {
			// not the angular way of doing it, but binding the event this way so that the focus does not have to be on a specific element
			document.addEventListener('keyup', function ctrlKeyListener(evt) {
				gameState.handleKey(evt.keyCode);
			});
		}]);
})(window.angular);

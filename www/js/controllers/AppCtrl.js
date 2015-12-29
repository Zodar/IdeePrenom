controllers.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaSQLite, $rootScope, DEV, Parse, NombrePrenom, RandomPrenom) {

	$scope.$on('$ionicView.enter', function(e) {
		initApp();
	});
	
	function initApp() {
		if ($rootScope.finishPopulate) {
			NombrePrenom.getAll(randomPrenom);
		} else {
			setTimeout(initApp, 5);
		}
	}
	
	function randomPrenom() {
		RandomPrenom.getAll(randomResult);
	}
	
	function randomResult(res) {
		$scope.randomPrenom = res;
	}
	
});
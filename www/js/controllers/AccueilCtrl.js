controllers.controller('AccueilCtrl', function($scope, $rootScope, RandomPrenom, FavorisBase, $ionicPopup, $cordovaToast, DEV, Message) {
	
	$scope.$on('$ionicView.enter', function(e) {
		getOrigins();
	});
	
	function getOrigins() {
		if ($rootScope.finishPopulate) {
			RandomPrenom.getAllOrigins(getOriginsSuccess);
		} else {
			setTimeout(getOrigins, 5);
		}
	}
	
	function getOriginsSuccess(result) {
		$scope.origins = result;
	}
	
	$scope.dataOrigins = {
		origins: null,
		multipleSelect: [],
	};
	
	$scope.origins = [];
	$scope.genre = "1";
	$scope.frequence = "1";
	$scope.origine = "1";
	$scope.lettre = {text: ''};
	
	$scope.data = {
		genre: '1',
		frequence: '1'
	};
	
	$scope.genreList = [
		{text: "Tout", sexe: "*", value: "1"},
		{text: "Garçon", sexe: "m", value: "m"},
		{text: "Fille", sexe: "f", value: "f"}
	];
	
	$scope.frequenceList = [
		{text: "Tout", value: "1"},
		{text: "Très commun", value: "+1"},
		{text: "Peu commun", value: "-1"}
	];
	
	$scope.genreChange = function(genre) {
		$scope.genre = genre.value;
	}
	
	$scope.frequenceChange = function(frequence) {
		$scope.frequence = frequence.value;
	}
	
	$scope.origineChange = function(origine) {
		$scope.origine = origine.value;
	}
	
	$scope.addToFavoris = function() {
		FavorisBase.saveOne(favorisAdded, $scope.randomPrenom, true);
	}
	
	function favorisAdded(message) {
		Message.shortCenter(message);
	}
	
	$scope.again = function() {
		RandomPrenom.withParams(randomResult, $scope.genre, $scope.frequence, $scope.dataOrigins.origins, $scope.lettre.text);
	}
	
	function randomResult(res) {
		if (res == null) {
			Message.longBottom("Aucun résultat !");
		} else {
			$scope.randomPrenom = res;		
		}
	}
	
});
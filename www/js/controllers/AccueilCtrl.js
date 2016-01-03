controllers.controller('AccueilCtrl', function($scope, $rootScope, RandomPrenom, FavorisBase, $ionicPopup, $cordovaToast, DEV, Message) {
	
	$scope.$on('$ionicView.enter', function(e) {
//		getOrigins();
		getOriginsSuccess()
	});
	
	function getOrigins() {
		if ($rootScope.finishPopulate) {
			RandomPrenom.getAllOrigins(getOriginsSuccess);
		} else {
			setTimeout(getOrigins, 5);
		}
	}
	
	function getOriginsSuccess() {
		var origins = [];
		origins.push({origine: "african"});
		origins.push({origine: "arabic"});
		origins.push({origine: "biblical"});
		origins.push({origine: "catalan"});
		origins.push({origine: "chinese"});
		origins.push({origine: "danish"});
		origins.push({origine: "english"});
		origins.push({origine: "german"});
		origins.push({origine: "greek"});
		origins.push({origine: "hungarian"});
		origins.push({origine: "iranian"});
		origins.push({origine: "irish"});
		origins.push({origine: "indian"});
		origins.push({origine: "italian"});
		origins.push({origine: "jewish"});
		origins.push({origine: "finnish"});
		origins.push({origine: "french"});
		origins.push({origine: "polish"});
		origins.push({origine: "portuguese"});
		origins.push({origine: "romanian"});
		origins.push({origine: "russian"});
		origins.push({origine: "spanish"});
		origins.push({origine: "swedish"});
		origins.push({origine: "turkish"});
		$scope.origins = origins;
	}
	
	$scope.dataOrigins = {
		origins: "1",
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
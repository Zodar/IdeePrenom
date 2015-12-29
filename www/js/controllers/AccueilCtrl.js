controllers.controller('AccueilCtrl', function($scope, RandomPrenom, FavorisBase, $ionicPopup, $cordovaToast, DEV) {
	
	$scope.genre = "1";
	$scope.frequence = "1";
	$scope.origine = "1";
	
	$scope.data = {
		genre: '1',
		frequence: '1'
	};
	
	$scope.genreList = [
		{text: "Tout", value: "1"},
		{text: "Garçon", value: "m"},
		{text: "Fille", value: "f"}
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
		FavorisBase.saveOne(favorisAdded, $scope.randomPrenom);
	}
	
	function favorisAdded() {
		if (DEV && !window.cordova) {
			alert("Favori ajouté !");
		}
		else {
			$cordovaToast.show('Favori ajouté !', 'short', 'center').then(function(success) {
		      // success
		    }, function (error) {
		    	console.error(error);
		    });	
		}
	}
	
	$scope.again = function() {
		RandomPrenom.withParams(randomResult, $scope.genre, $scope.frequence, $scope.origine);	
	}
	
	function randomResult(res) {
		if (res == null) {
			if (DEV && !window.cordova) {
				alert("Aucun résultat");	
			}
			else {
				$cordovaToast.show('Aucun résultat', 'short', 'center').then(function(success) {
			      // success
			    }, function (error) {
			    	console.error(error);
			    });	
			}
		} else {
			$scope.randomPrenom = res;		
		}
	}
	
});
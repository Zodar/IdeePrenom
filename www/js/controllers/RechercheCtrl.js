controllers.controller('RechercheCtrl', function($scope, $state, $rootScope, NombrePrenom, RandomPrenom, FavorisBase, $ionicPopup, $cordovaToast, DEV, Message) {
	
	$scope.origins = [];
	$scope.genres = [];
	$scope.genre = "1";
	$scope.frequence = "1";
	$scope.origine = "1";
	$scope.lettre = {text: ''};
	
	$scope.$on('$ionicView.enter', function(e) {
		setOrigins();
		setGenre();
		setFrequence();
	});
	
	$scope.search = function() {
		$rootScope.request = {genre: $scope.dataGenres.genres,
								frequence: $scope.dataFrequences.frequences,
								origine: $scope.dataOrigins.origins,
								lettre: $scope.lettre.text};
        $state.go('app.liste', {}, {reload: true});
	}
	
	function setGenre() {
		var genres = [];
		genres.push({genre: "Garçon", value: "m"});
		genres.push({genre: "Fille", value: "f"});
		$scope.genres = genres;
	}
	
	function setFrequence() {
		var frequences = [];
		frequences.push({frequence: "Très commun", value: "+1"});
		frequences.push({frequence: "Peu commun", value: "-1"});
		$scope.frequences = frequences;		
	}
	
	function setOrigins() {
		var origins = [];
		origins.push({origine: "African"});
		origins.push({origine: "Arabic"});
		origins.push({origine: "Biblical"});
		origins.push({origine: "Catalan"});
		origins.push({origine: "Chinese"});
		origins.push({origine: "Danish"});
		origins.push({origine: "English"});
		origins.push({origine: "German"});
		origins.push({origine: "Greek"});
		origins.push({origine: "Hungarian"});
		origins.push({origine: "Iranian"});
		origins.push({origine: "Irish"});
		origins.push({origine: "Indian"});
		origins.push({origine: "Italian"});
		origins.push({origine: "Jewish"});
		origins.push({origine: "Finnish"});
		origins.push({origine: "French"});
		origins.push({origine: "Polish"});
		origins.push({origine: "Portuguese"});
		origins.push({origine: "Romanian"});
		origins.push({origine: "Russian"});
		origins.push({origine: "Spanish"});
		origins.push({origine: "Swedish"});
		origins.push({origine: "Turkish"});
		$scope.origins = origins;
	}
	
	$scope.dataOrigins = {
		origins: "1",
		multipleSelect: [],
	};
	
	$scope.dataGenres = {
		genres: "1",
		multipleSelect: [],
	};
	
	$scope.dataFrequences = {
		frequences: "1",
		multipleSelect: [],
	};
	
	$scope.genreChange = function(genre) {
		$scope.genre = genre.value;
	}
	
	$scope.frequenceChange = function(frequence) {
		$scope.frequence = frequence.value;
	}
	
	$scope.origineChange = function(origine) {
		$scope.origine = origine.value;
	}
	
});
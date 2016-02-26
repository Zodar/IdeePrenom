controllers.controller('ListeCtrl', function($scope, $rootScope, $ionicLoading, FavorisBase, RandomPrenom, Message, $ionicPopup, DEV, ADS) {
	
	$scope.bouton_plus = true;
	$scope.prenoms = null;
	$scope.listePrenoms = [];
	$scope.limit = 0;
	
	$scope.$on('$ionicView.enter', function(e) {
		if ($rootScope.request) {
			//$ionicLoading.show({template: "Chargement des prénoms"});
			var liste = true;
			RandomPrenom.withParams(listPrenoms,
				$rootScope.request.genre,
				$rootScope.request.frequence,
				$rootScope.request.origine,
				$rootScope.request.lettre, liste);	
		}
		ADS.show();
	});
	
	// $scope.addItems = function() {
	// 	alert("yo");
	// 	for (var i = $scope.limit; i < $scope.limit + 20; i++) {
	// 		if ($scope.prenoms != null && i < $scope.prenoms.length) {
	// 			$scope.listePrenoms.push($scope.prenoms[i]);	
	// 		} else {
 //      			//$scope.noMoreItemsAvailable = true;
	// 		}
	// 	}
	// 	$scope.limit += 20;
 //    	$scope.$broadcast('scroll.infiniteScrollComplete');
	// 	$ionicLoading.hide();
	// }
	
	$scope.addToFavoris = function(item) {
		$ionicPopup.show({title: 'Favoris',
			title: 'Voulez vous ajouter ' + item.prenom + ' à vos favoris ?',
			buttons: [{text: '<b>Ajouter</b>', type: 'button-positive',
				onTap: function(e) {
					FavorisBase.saveOne(function favorisAdded(message) {
						Message.shortCenter(message);
					}, item, true);
				}
			}, {text: 'Annuler'}]
		});	
	}
	
	/**
	 * Liste les prénoms reçu depuis la base de données.
	 */
	function listPrenoms(result) {
		$scope.listePrenoms = [];
		$scope.limit = 0;

		$scope.prenoms = result;
		
		if (result == null) {
			Message.shortCenter("Aucuns résultats");
			$ionicLoading.hide();
			$scope.bouton_plus = false;
		} else {
			//$scope.addItems();
			$scope.loadMore();
			$scope.bouton_plus = true;
		}
	}


	$scope.noMoreItemsAvailable = false;

	$scope.loadMore = function() {
    	for (var i = $scope.limit; i < $scope.limit + 20; i++) {
			if ($scope.prenoms != null && i < $scope.prenoms.length) {
				$scope.listePrenoms.push($scope.prenoms[i]);	
			}
		}
		$scope.limit += 20;
		$ionicLoading.hide();

    	if ($scope.listePrenoms != null && $scope.prenoms != null) {
	    	if ($scope.listePrenoms.length == $scope.prenoms.length) {
	    		$scope.noMoreItemsAvailable = true;
	    	}
    	}
    	$scope.$broadcast('scroll.infiniteScrollComplete');
  	};
});
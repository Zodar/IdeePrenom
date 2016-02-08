controllers.controller('ListeCtrl', function($scope, $rootScope, $ionicLoading, FavorisBase, RandomPrenom, Message, $ionicPopup, DEV, ADS) {
	
	$scope.$on('$ionicView.enter', function(e) {
		var liste = true;
		$ionicLoading.show({template: "Chargement des prénoms"});
		RandomPrenom.withParams(listPrenoms,
				$rootScope.request.genre,
				$rootScope.request.frequence,
				$rootScope.request.origine,
				$rootScope.request.lettre, liste);
		ADS.show();
	});
	
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
		$scope.listePrenoms = result;
		$ionicLoading.hide();
		if (result == null) {
			Message.shortCenter("Aucuns résultats");
		}
	}
	
});
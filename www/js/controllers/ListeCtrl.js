controllers.controller('ListeCtrl', function($scope, FavorisBase, PrenomBase, Message, $ionicPopup, DEV, ADS) {
	
	$scope.$on('$ionicView.enter', function(e) {
		initPage();
		ADS.show();
	});
	
	$scope.addToFavoris = function(item) {
		$ionicPopup.show({title: 'Favoris',
			title: 'Voulez vous ajouter ' + item.prenom + ' à vos favoris ?',
			buttons: [{text: '<b>Ajouter</b>', type: 'button-positive',
				onTap: function(e) {
					FavorisBase.saveOne(favorisAdded, item, true);
				}
			}, {text: 'Annuler'}]
		});	
	}
	
	function favorisAdded(message) {
		Message.shortCenter(message);
	}
	
	/**
	 * Au lancement de la page.
	 */
	function initPage() {
		PrenomBase.getAll(listPrenoms);
	}
	
	/**
	 * Liste les prénoms reçu depuis la base de données.
	 */
	function listPrenoms(result) {
		$scope.listePrenoms = result;
	}
	
});
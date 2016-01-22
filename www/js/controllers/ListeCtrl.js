controllers.controller('ListeCtrl', function($scope, FavorisBase, PrenomBase, Message, $ionicPopup) {
	
	$scope.$on('$ionicView.enter', function(e) {
		initPage();
	    ads();
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
	
	function ads() {
		adbuddiz.setLogLevel(adbuddiz.LogLevel.Silent);
	    adbuddiz.setAndroidPublisherKey("c799bdf4-0c3b-4a5f-b5c3-4ff23b0511d5");
	    adbuddiz.cacheAds();
	    adbuddiz.showAd();
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
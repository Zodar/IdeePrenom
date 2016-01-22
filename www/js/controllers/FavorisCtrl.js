controllers.controller('FavorisCtrl', function($scope, FavorisBase, Message, $ionicPopup) {
	
	$scope.$on('$ionicView.enter', function(e) {
		initPage();
	    ads();
	});
	
	function ads() {
		adbuddiz.setLogLevel(adbuddiz.LogLevel.Silent);
	    adbuddiz.setAndroidPublisherKey("c799bdf4-0c3b-4a5f-b5c3-4ff23b0511d5");
	    adbuddiz.cacheAds();
	    adbuddiz.showAd();
	}
	
	$scope.deleteOne = function(prenom) {
		var index;
		$ionicPopup.show({title: 'Suppression',
			subTitle: 'Voulez vous supprimer ' + prenom.prenom + ' de vos favoris ?',
			buttons: [{text: '<b>Supprimer</b>', type: 'button-positive',
				onTap: function(e) {
					FavorisBase.deleteOne(deleteOneSuccess, prenom);
					angular.forEach($scope.listFavoris, function(value, key) {
						if (value.prenom == prenom.prenom) {
							index = $scope.listFavoris.indexOf(value);
							if (index > -1) {
								$scope.listFavoris.splice(index, 1);
							}
						} 
					});
				}
			}, {text: 'Annuler'}]
		});
	}
	
	function deleteOneSuccess(message) {
		Message.shortCenter(message);
	}
	
	/**
	 * Au lancement de la page.
	 */
	function initPage() {
		FavorisBase.getAll(listFavoris);
	}
	
	/**
	 * Liste les favoris reçu depuis la base de données.
	 */
	function listFavoris(result) {
		if (!result.length) {
			$scope.noFavoris = true;
			Message.longBottom("Aucuns favoris");
		} else {
			Message.log("Listage des favoris...");
			$scope.noFavoris = false;
			$scope.listFavoris = result;
		}
	}
	
});
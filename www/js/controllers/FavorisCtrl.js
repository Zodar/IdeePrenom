controllers.controller('FavorisCtrl', function($scope, FavorisBase, Message, $ionicPopup, DEV, ADS) {
	
	$scope.$on('$ionicView.enter', function(e) {
		FavorisBase.getAll(listFavoris);
		ADS.show();
	});
	
	$scope.deleteOne = function(prenom) {
		var index;
		$ionicPopup.show({title: 'Suppression',
			subTitle: 'Voulez vous supprimer ' + prenom.prenom + ' de vos favoris ?',
			buttons: [{text: '<b>Supprimer</b>', type: 'button-positive',
				onTap: function(e) {
					FavorisBase.deleteOne(function deleteOneSuccess(message) {
						Message.shortCenter(message);
						angular.forEach($scope.listFavoris, function(value, key) {
							if (value.prenom == prenom.prenom) {
								index = $scope.listFavoris.indexOf(value);
								if (index > -1) {
									$scope.listFavoris.splice(index, 1);
								}
							} 
						});
					}, prenom);
				}
			}, {text: 'Annuler'}]
		});
	}
	
	/**
	 * Liste les favoris reçu depuis la base de données.
	 */
	function listFavoris(result) {
		if (!result.length) {
			$scope.noFavoris = true;
			Message.shortCenter("Aucuns favoris");
		} else {
			Message.log("Listage des favoris...");
			$scope.noFavoris = false;
			$scope.listFavoris = result;
		}
	}
	
});
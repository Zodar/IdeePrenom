controllers.controller('FavorisCtrl', function($scope, FavorisBase, Message) {
	
	$scope.$on('$ionicView.enter', function(e) {
		initPage();
	});
	
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
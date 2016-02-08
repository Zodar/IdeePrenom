app.config(function($stateProvider, $urlRouterProvider) {
	  
	$stateProvider.state('app', {
	    url: '/app',
	    abstract: true,
	    templateUrl: 'templates/tabs.html',
	    controller: 'AppCtrl'
	});
	
	$stateProvider.state('app.accueil', {
		url: '/accueil',
		views: {
			'tab-home': {
				templateUrl: 'templates/accueil.html',
				controller: 'AccueilCtrl'
			}
		}
    });
	
	$stateProvider.state('app.favoris', {
		url: '/favoris',
		views: {
			'tab-favoris': {
				templateUrl: 'templates/favoris.html',
				controller: 'FavorisCtrl'
			}
		}
	});
	
	$stateProvider.state('app.liste', {
		url: '/liste',
		views: {
			'tab-liste': {
				templateUrl: 'templates/liste.html',
				controller: 'ListeCtrl'
			}
		}
	});
	
	$stateProvider.state('app.recherche', {
		url: '/recherche',
		views: {
			'tab-recherche': {
				templateUrl: 'templates/recherche.html',
				controller: 'RechercheCtrl'
			}
		}
	});
  
	$urlRouterProvider.otherwise('/app/accueil');
});
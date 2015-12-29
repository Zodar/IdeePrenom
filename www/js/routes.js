app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('app', {
	    url: '/app',
	    abstract: true,
	    templateUrl: 'templates/menu.html',
	    controller: 'AppCtrl'
	});
	
	$stateProvider.state('app.accueil', {
		url: '/accueil',
		views: {
			'menuContent': {
				templateUrl: 'templates/accueil.html',
				controller: 'AccueilCtrl'
			}
		}
    });
	
	$stateProvider.state('app.favoris', {
		url: '/favoris',
		views: {
			'menuContent': {
				templateUrl: 'templates/favoris.html',
				controller: 'FavorisCtrl'
			}
		}
	});

	$stateProvider.state('app.single', {
		url: '/accueil/:playlistId',
		views: {
			'menuContent': {
				templateUrl: 'templates/playlist.html',
				controller: 'PlaylistCtrl'
			}
		}
	});
  
	$urlRouterProvider.otherwise('/app/accueil');
});
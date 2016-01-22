app.run(function($ionicPlatform, $http, $cordovaSQLite, $ionicLoading, $rootScope, DEV, InitDb) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
		
		InitDb.init();
	});
});

app.config(function($ionicConfigProvider) {
	$ionicConfigProvider.tabs.position('bottom');
});
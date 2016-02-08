app.run(function($ionicPlatform, InitDb, ADS) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}

		ADS.init();
		InitDb.init();
	});
});

app.config(function($ionicConfigProvider) {
	$ionicConfigProvider.tabs.position('bottom');
});
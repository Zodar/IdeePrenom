services.factory('ADS', function(DEV, ShowAds) {

	var self = this;
	self.prenom = null;
	
	self.init = function() {
		if (ShowAds) {
			adbuddiz.setLogLevel(adbuddiz.LogLevel.Silent);
		    adbuddiz.setAndroidPublisherKey("c799bdf4-0c3b-4a5f-b5c3-4ff23b0511d5");
		    adbuddiz.cacheAds();
		}
	}

	self.show = function() {
		if (ShowAds) {
	    	adbuddiz.showAd();
		}
	}
	
	return self;
});
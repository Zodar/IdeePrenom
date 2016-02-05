services.factory('Message', function(DEV, $cordovaToast) {

	var self = this;
	self.callback = null;
	
	self.log = function(message) {
		if (DEV) {
			console.log(message);
		}
	}
	
	self.shortCenter = function(message) {
		if (!window.cordova) {
			alert(message);
		}
		else {
			$cordovaToast.show(message, 'short', 'center').then(function(success) {
				self.log("Message affiché");
		    }, function (error) {
		    	self.erreur(error);
		    });	
		}
	}
	
	self.longBottom = function(message) {
		if (!window.cordova) {
			alert(message);
		}
		else {
			$cordovaToast.show(message, 'long', 'bottom').then(function(success) {
				self.log("Message affiché");
		    }, function (error) {
		    	self.erreur(error);
		    });	
		}
	}
	
	self.erreur = function(erreur) {
		if (!window.cordova) {
			alert("Une erreur s'est produite");
			Message.log(erreur);
		}
		else {
			self.shortCenter("Une erreur s'est produite");
			Message.log(JSON.stringify(erreur));
		}
	}
	
	return self;
});
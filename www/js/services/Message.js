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
				if (DEV) {
					console.log("Message affiché");
				}
		    }, function (error) {
		    	self.erreur(error, "Message.js l.16");
		    });	
		}
	}
	
	self.longBottom = function(message) {
		if (!window.cordova) {
			alert(message);
		}
		else {
			$cordovaToast.show(message, 'long', 'bottom').then(function(success) {
				if (DEV) {
					console.log("Message affiché");
				}
		    }, function (error) {
		    	self.erreur(error, "Message.js l.31");
		    });	
		}
	}
	
	self.erreur = function(erreur, line) {
		if (!window.cordova) {
			alert("Une erreur s'est produite");
			console.log("Erreur: " + line);
			console.error(erreur);	
		}
		else {
			self.shortCenter("Une erreur s'est produite");
			if (DEV) {
				console.log(JSON.stringify(erreur));
			}
		}
	}
	
	return self;
});
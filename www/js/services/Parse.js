services.factory('Parse', function($cordovaSQLite, $rootScope, $ionicLoading, $http, DEV) {

	var self = this;
	
	self.all = function(prenom) {
		prenom.prenom = self.up(prenom.prenom);
		prenom.genre = self.genre(prenom.genre);
		prenom.frequence = self.frequence(prenom.frequence);
		prenom.origine = self.origine(prenom.origine);
		return prenom;
	}
	
	self.up = function(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	self.genre = function(genre) {
		return genre == "f" ? "Fille" : "Garçon";
	}
	
	self.origine = function(origine) {
		origine = origine == "" ? "Non répértorié" : origine;
		origine = origine == "?" ? "Non répértorié" : origine;
		return self.up(origine);
	}
	
	self.frequence = function(frequence) {
		if (frequence > 3) {
			return "Extrement commun";
		} else if (frequence > 2) {
			return "Très commun";
		} else if (frequence > 1) {
			return "Commun";
		} else if (frequence > 0.5) {
			return "Peu commun";
		} else if (frequence > 0.2) {
			return "Rare";
		} else if (frequence > 0) {
			return "Très rare"
		} else {
			return "Non répértorié";
		}
	}
	
	return self;
});
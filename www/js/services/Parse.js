services.factory('Parse', function($cordovaSQLite, $rootScope, $ionicLoading, $http, DEV) {

	var self = this;
	self.prenom = null;
	
	self.all = function(prenom) {
		self.prenom = prenom;
		self.up();
		self.genre();
		self.origine();
		self.frequence();
		return self.prenom;
	}
	
	self.up = function() {
		self.prenom.prenom = self.prenom.prenom.charAt(0).toUpperCase() + self.prenom.prenom.slice(1);
	}
	
	self.genre = function() {
		self.prenom.sexe = self.prenom.genre;
		self.prenom.genre = self.prenom.genre == "f" ? "Fille" : "Garçon";
	}
	
	self.origine = function() {
		self.prenom.origine = self.prenom.origine == "" ? "Non répértorié" : self.prenom.origine;
		self.prenom.origine = self.prenom.origine == "?" ? "Non répértorié" : self.prenom.origine;
	}
	
	self.frequence = function() {
		if (self.prenom.frequence > 3) {
			self.prenom.frequence = "Extrement commun";
		} else if (self.prenom.frequence > 2) {
			self.prenom.frequence = "Très commun";
		} else if (self.prenom.frequence > 1) {
			self.prenom.frequence = "Commun";
		} else if (self.prenom.frequence > 0.5) {
			self.prenom.frequence = "Peu commun";
		} else if (self.prenom.frequence > 0.2) {
			self.prenom.frequence = "Rare";
		} else if (self.prenom.frequence > 0) {
			self.prenom.frequence = "Très rare"
		} else {
			self.prenom.frequence = "Non répértorié";
		}
	}
	
	return self;
});
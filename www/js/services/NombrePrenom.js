services.factory('NombrePrenom', function($cordovaSQLite, $rootScope, $ionicLoading, $http, DEV, Message) {

	var self = this;
	self.callback = null;
	
	self.getAll = function(callback) {
		if (callback)
			self.callback = callback;
		if ($rootScope.finishPopulate) {
			$cordovaSQLite.execute($rootScope.db, "SELECT * FROM Nom;", []).then(function(res) {
				Message.log("Nombre de prénoms: " + res.rows.length)
				$rootScope.nbPrenoms = res.rows.length;
				self.callback();
			}, function (err) {
				Message.erreur(err, "NombrePrenom.js l.15");
			});
		} else {
			setTimeout(self.getAll, 50);
		}
	}
	
	return self;
});
services.factory('FavorisBase', function($cordovaSQLite, $rootScope, $ionicLoading, $http, DEV) {

	var self = this;
	self.callback = null;
	
	self.saveOne = function(callback, prenom) {
	    var query = "INSERT INTO Favoris (prenom, genre, origine, frequence, sexe) VALUES ";
	    query += "('" + 
		prenom.prenom + "', '" +
		prenom.genre + "', '" +
		prenom.origine + "', '" +
		prenom.frequence + "', '" +
		prenom.sexe + "'); ";
		
		$cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
			callback();
		}, function (err) {
			if (DEV) {
				console.error(err);
			}
		});
	}
	
	self.getAll = function(callback, prenom) {
	    var query = "SELECT * FROM Favoris;";
		
		$cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
			var arrayResult = [];
			var i;
			for (i = 0; i < res.rows.length; i++) {
				arrayResult.push(res.rows.item(i));
			}
			callback(arrayResult);
		}, function (err) {
			if (DEV) {
				console.error(err);
			}
		});
	}
	
	return self;
});
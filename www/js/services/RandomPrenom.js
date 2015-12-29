services.factory('RandomPrenom', function($cordovaSQLite, $rootScope, $ionicLoading, $http, DEV, Parse) {

	var self = this;
	self.nbPrenoms = 1;
	
	self.getAll = function(callback) {
		var random = Math.floor((Math.random() * $rootScope.nbPrenoms) + 1);
		$cordovaSQLite.execute($rootScope.db, "SELECT * FROM Nom where id = " + random + " ;", []).then(function(res) {
			var prenom = res.rows.item(0);
			callback(Parse.all(prenom));
		}, function (err) {
			if (DEV) {
				console.error(err);
			}
		});
	}
	
	self.withParams = function(callback, genre, frequence, origine) {
		var query = "SELECT * FROM Nom where 1 ";
		
		if (genre != "1" || frequence != "1" || origine != "1") {
			if (genre != "1") {
				query += "AND genre = '" + genre + "' ";
			}
			if (frequence != "1") {
				if (frequence == "+1") {
					query += "AND frequence > 1 ";
				} else {
					query += "AND frequence < 1 ";
				}
			}
			if (origine != "1") {
				query += "AND origine = '" + origine + "' ";
			}
			self.randomWithParams(callback, query);
		} else {
			self.randomWithParams(callback, query);
		}
	}
	
	self.randomWithParams = function(callback, query) {
		$cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
			if (res.rows.length) {
				var random = Math.floor(Math.random() * res.rows.length);
				var prenom = res.rows.item(random);
				callback(Parse.all(prenom));
			} else {
				callback(null);
			}
		}, function (err) {
			if (DEV) {
				console.error(err);
			}
		});
	}
	
	return self;
});
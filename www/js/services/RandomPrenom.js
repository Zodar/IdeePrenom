services.factory('RandomPrenom', function($cordovaSQLite, $rootScope, $ionicLoading, $http, DEV, Parse, Message) {

	var self = this;
	self.nbPrenoms = 1;
	
	self.getAll = function(callback) {
		var random = Math.floor((Math.random() * $rootScope.nbPrenoms) + 1);
		$cordovaSQLite.execute($rootScope.db, "SELECT * FROM Nom where id = " + random + " ;", []).then(function(res) {
			var prenom = res.rows.item(0);
			callback(Parse.all(prenom));
		}, function (err) {
			Message.erreur(err, "RandomPrenom.js l.12");
		});
	}
	
	self.withParams = function(callback, genre, frequence, origine, lettre) {
		var query = "SELECT * FROM Nom where 1 ";
		
		if (genre != "1") {
			query += "AND genre = '" + genre + "' ";	
		}
		if (origine != "1") {
			query += "AND origine = '" + origine + "' ";	
		}
		
		if (lettre != "") {
			query += "AND LOWER(SUBSTR(prenom, 1, 1)) = LOWER('" + lettre + "') ";			
		}

		if (frequence == "+1") {
			query += "AND frequence > 1 ";
		} else if (frequence != "1") {
			query += "AND frequence < 1 ";
		}
		
		self.randomWithParams(callback, query);
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
			Message.erreur(err, "RandomPrenom.js l.49");
		});
	}
	
	return self;
});
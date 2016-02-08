services.factory('RandomPrenom', function($cordovaSQLite, $rootScope, $ionicLoading, $http, DEV, Parse, Message) {

	var self = this;

	self.getAllOrigins = function(callback) {
		$cordovaSQLite.execute($rootScope.db, "SELECT DISTINCT origine FROM Nom;", []).then(function(res) {
			var arrayResult = [];
			var i;
			if (res.rows.length == 0) {
				callback(null);
			} else {
				for (i = 0; i < res.rows.length; i++) {
					arrayResult.push(res.rows.item(i));
				}
				callback(arrayResult);
			}
		}, function (err) {
			Message.erreur(err);
		});
	}
	
	self.getAll = function(callback) {
		var random = Math.floor((Math.random() * $rootScope.nbPrenoms) + 1);
		$cordovaSQLite.execute($rootScope.db, "SELECT * FROM Nom where id = " + random + " ;", []).then(function(res) {
			var prenom = res.rows.item(0);
			callback(Parse.all(prenom));
		}, function (err) {
			Message.erreur(err);
		});
	}
	
	self.withParams = function(callback, genre, frequence, origine, lettre, liste) {
		var query = "SELECT * FROM Nom where 1 ";
		
		if (genre != "1") {
			query += "AND genre = '" + genre + "' ";	
		}
		
		if (origine != "1") {
			query += "AND origine LIKE '%" + origine + "%' ";
		}
		
		if (lettre != "") {
			query += "AND LOWER(SUBSTR(prenom, 1, 1)) = LOWER('" + lettre + "') ";			
		}

		if (frequence == "+1") {
			query += "AND frequence > 1 ";
		} else if (frequence != "1") {
			query += "AND frequence < 1 ";
		}
		
		if (liste) {
			self.listeWithParams(callback, query);		
		} else {	
			self.randomWithParams(callback, query);
		}	
	}
	
	self.listeWithParams = function(callback, query) {
		Message.log(query);
		$cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
			var arrayResult = [];
			var i;
			if (res.rows.length == 0) {
				callback(null);
			} else {
				for (i = 0; i < res.rows.length; i++) {
					arrayResult.push(Parse.all(res.rows.item(i)));
				}
				callback(arrayResult);
			}
		}, function (err) {
			Message.erreur(err);
		});
	}
	
	self.randomWithParams = function(callback, query) {
		var random = Math.floor(Math.random() * $rootScope.nbPrenoms);
		query += " AND id = " + random;
		Message.log(query);
		$cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
			if (res.rows.length) {
				var prenom = res.rows.item(0);
				callback(Parse.all(prenom));
			} else {
				callback(null);
			}
		}, function (err) {
			Message.erreur(err);
		});
	}
	
	return self;
});
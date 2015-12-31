services.factory('FavorisBase', function($cordovaSQLite, $rootScope, $ionicLoading, $http, DEV, Message) {

	var self = this;
	self.callback = null;
	
	self.saveOne = function(callback, prenom, check) {
		if (check == true) {
			self.checkIfAlreadySaved(callback, prenom);	
		} else {
		    var query = "INSERT INTO Favoris (prenom, genre, origine, frequence, sexe) VALUES ";
		    query += "('" + 
			prenom.prenom + "', '" +
			prenom.genre + "', '" +
			prenom.origine + "', '" +
			prenom.frequence + "', '" +
			prenom.sexe + "'); ";
			
			$cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
				callback("Favori ajouté !");
			}, function (err) {
				Message.erreur(err, "FavorisBase.js l.21");
			});
		}
	}
	
	self.deleteOne = function(callback, prenom) {
		var query = "DELETE FROM Favoris WHERE prenom = '" + prenom.prenom + "';";
		$cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
			callback("Favori supprimé.");
		}, function (err) {
			Message.erreur(err, "FavorisBase.js l.31");
		});
	}
	
	self.checkIfAlreadySaved = function(callback, prenom) {
		var query = "SELECT * FROM Favoris WHERE prenom = '" + prenom.prenom + "';";
		
		$cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
			if (res.rows.length == 0) {
				self.saveOne(callback, prenom, false);
			} else {
				callback("Favori déjà ajouté.");
			}
		}, function (err) {
			Message.erreur(err, "FavorisBase.js l.45");
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
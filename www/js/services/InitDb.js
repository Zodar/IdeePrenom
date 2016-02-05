services.factory('InitDb', function($cordovaSQLite, $rootScope, $ionicLoading, $http, DEV, Message, $state) {

	var self = this;
	self.prenoms = null;
	self.devNbPrenoms = 200;
	
	self.init = function() {
		$rootScope.finishPopulate = false;
		$rootScope.db = window.cordova ? $cordovaSQLite.openDB("DB") : $rootScope.db = window.openDatabase("DB", "1.0", "DB", -1);
	
		if (DEV) {
			$cordovaSQLite.execute($rootScope.db, "DROP TABLE IF EXISTS Nom;", []).then(function(res) {
				populateDB();
				Message.log("Table Nom supprimée");
			}, function(error) {
				Message.erreur(error);
			});
		}
		else {
			populateDB();
		}
	}
	
	/**
	 * Recupere le CSV des prenoms puis lance la fonction de BDD
	 */
	function populateDB() {
		$cordovaSQLite.execute($rootScope.db, "SELECT name FROM sqlite_master WHERE type='table' AND name='Nom';", []).then(function(res) {
	    	if (res.rows.length == 0) {
	    		$ionicLoading.show({template: "Chargement des prénoms"});
	    		getFile();
	    		Message.log("Pas de tables");			
		    } else {
		    	Message.log("Table 'Nom' existe.");
	            $rootScope.finishPopulate = true;
	    	}
        }, function (err) {
        	Message.erreur(err);
		});
	}
	
	function getFile() {
		$http({method: 'GET', url: 'prenoms/prenoms.csv'}).then(function success(response) {
			Message.log("prenoms.csv récuperé");
			self.prenoms = response.data;
			initData();
		}, function error(response) {
			Message.erreur(error);
		});
	}
	
	/**
	 * Cree les tables et parcours tous les prenoms
	 */
	function initData() {
		self.prenoms = self.prenoms.replace(/'/g, '');
		self.prenoms = Papa.parse(self.prenoms);
		var query = "CREATE TABLE IF NOT EXISTS Nom (id INTEGER PRIMARY KEY AUTOINCREMENT, prenom VARCHAR, genre VARCHAR, origine VARCHAR, frequence VARCHAR);";

	    $cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
			query = "CREATE TABLE IF NOT EXISTS Favoris (id INTEGER PRIMARY KEY AUTOINCREMENT, prenom VARCHAR, genre VARCHAR, origine VARCHAR, frequence VARCHAR, sexe VARCHAR);";
			$cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
			    insertRows();
			    Message.log("Tables créees");
			}, function (err) {
				Message.erreur(err);
			});
		}, function (err) {
			Message.erreur(err);
		});
	}
	
	/**
	 * Insert les prenoms dans la BDD
	 */
	function insertRows() {
	    var len = DEV ? self.devNbPrenoms : self.prenoms.data.length;
	    var query = "INSERT INTO Nom (prenom, genre, origine, frequence) VALUES ";
	    for (var i = 1; i < len; i++) {
			query += "('" + 
			self.prenoms.data[i][0] + "', '" +
			self.prenoms.data[i][1] + "', '" +
			self.prenoms.data[i][2] + "', '" +
			self.prenoms.data[i][3] + "'), ";
		}
	    query = query.slice(0, -2);

	    $cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
			Message.log("Prenoms enregistrés");
			$ionicLoading.hide();
		    $rootScope.finishPopulate = true;
            $state.go($state.current, {}, {reload: true});
	    }, function (error) {
	    	Message.erreur(error);
		});
	}
	
	/**
	 * Ouvre la base de donnée et appelle les fonctions de création de la structure.
	 */
	function openDB() {
		if (window.cordova) {
	        $rootScope.db = $cordovaSQLite.openDB("DB");
		} else {
			$rootScope.db = window.openDatabase("DB", "1.0", "DB", -1);
		}
	}
	
	return self;
});
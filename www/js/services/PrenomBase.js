services.factory('PrenomBase', function($cordovaSQLite, $rootScope, Parse, $ionicLoading, $http, DEV, Message) {

	var self = this;
	
	self.getAll = function(callback) {
	    var query = "SELECT * FROM Nom;";
		
		$cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
			var arrayResult = [];
			var i;
			for (i = 0; i < res.rows.length; i++) {
				arrayResult.push(Parse.all(res.rows.item(i)));
			}
			callback(arrayResult);
		}, function (err) {
			Message.erreur(err);
		});
	}
	
	return self;
});
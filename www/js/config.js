var app = angular.module('starter', ['ionic', 'starter.config', 'starter.controllers', 'starter.services', 'ngCordova'])
var controllers = angular.module('starter.controllers', []);
var services = angular.module('starter.services', []);
var config = angular.module('starter.config', []);

//DEV-PROD
config.constant('DEV', false);

//Affiche ou non le nombre de prénom dans la console.
config.constant('PrintNB', false);

//Affiche ou non les pubs.
config.constant('ShowAds', false);
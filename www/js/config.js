var app = angular.module('starter', ['ionic', 'starter.config', 'starter.controllers', 'starter.services', 'ngCordova'])
var controllers = angular.module('starter.controllers', []);
var services = angular.module('starter.services', []);
var config = angular.module('starter.config', []);

config.constant('DEV', true); //DEV-PROD
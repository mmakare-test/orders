import angular from 'angular';
import uirouter from 'angular-ui-router';

import template from './app.tpl.html';

export default angular
    .module('main.app', [uirouter])
    .config(($urlRouterProvider, $stateProvider, $locationProvider) => {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/orders');

      $stateProvider
        .state('app', {
            abstract: true,
            template: '<app-component></app-component>'
        })
    })
    .component('appComponent', { template })
    .name;

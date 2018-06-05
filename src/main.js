import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import angular from 'angular';

// Modules
import app from './app/app';
import orders from './orders/orders';
import order from './order/order';

angular.module('main', [
  app, orders, order
]);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['main']);
});

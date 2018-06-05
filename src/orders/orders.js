import './orders.css';
import angular from 'angular';
import uirouter from 'angular-ui-router';

import OrdersService from './orders.service';
import OrderListComponent from './order-list/order-list';
import template from './order-list/order-list.tpl.html';

export default angular
  .module('main.app.orders', [uirouter])
  .config(($stateProvider) => {
    $stateProvider
      .state('app.orders', {
        url: '/orders',
        template: '<order-list></order-list>'
      });
  })
  .component('orderList', { controller: OrderListComponent, template })
  .service('ordersService', OrdersService)
  .name;

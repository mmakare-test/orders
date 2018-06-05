import './order.css';
import angular from 'angular';
import uirouter from 'angular-ui-router';

import OrderComponent from './order-component/order-component';
import template from './order-component/order-component.tpl.html';

import AddProductComponent from './add-product-component/add-product-component';
import addProductTemplate from './add-product-component/add-product-component.tpl.html';

export default angular
  .module('main.app.order', [uirouter])
  .config(($stateProvider) => {
    $stateProvider
      .state('app.order', {
        url: '/new-order?from',
        params: {
          from: null
        },
        template: '<order></order>'
      });
  })
  .component('order', { controller: OrderComponent, template })
  .component('addProduct', { 
    controller: AddProductComponent, 
    template: addProductTemplate,
    bindings: {
      productsCatalog: '<',
      onCancel: '&',
      onAdd: '&'
    }
  })
  .name;

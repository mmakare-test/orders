export default class OrderListComponent {
  constructor(ordersService) {
    ordersService.getOrders()
      .then((orders) => this.orders = orders);
  }
}

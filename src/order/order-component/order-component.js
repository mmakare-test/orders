export default class OrderComponent {

  constructor($scope, $stateParams, $state, ordersService) {
    this.$state = $state;
    this.$scope = $scope;
    this.ordersService = ordersService;
    this.fromId = $stateParams.from;
    this.isAddingProduct = false;
      
    // load order products  
    ordersService.getOrderProducts(this.fromId)
      .then((products) => {
        this.products = products;
        this.total = this.products.reduce((p, n) => p += n.price*n.qty, 0);
      });

    // load product lookup object
    ordersService.getProductsCatalog()
      .then((products) => {
        this.productsCatalog = products;
      });
  }

  placeOrder() {
    this.ordersService.placeOrder(this.products)
      .then(() => this.$state.go("app.orders"));
  }

  showAddProduct() {
    this.isAddingProduct = true;
  }

  addProduct({ product }) {
    let addProductPromise;

    if (!product.id) {
      addProductPromise = this.ordersService.addProductToCatalog(product);
    } else {
      const catalogItem = this.productsCatalog.find(item => item.id === product.id);
      
      addProductPromise = Promise.resolve({
        id: product.id,
        name: catalogItem.name,
        price: catalogItem.price
      });
    }

    addProductPromise.then((newProduct) => {
      // update order
      this.products.push({
        ...newProduct,
        qty: product.qty
      });

      // update totals
      this.total = this.products.reduce((p, n) => p += n.price*n.qty, 0);
      // hide Add form
      this.isAddingProduct = false;
      this.$scope.$apply();
    });
  }

  cancelAddProduct() {
    this.isAddingProduct = false;
  }
}

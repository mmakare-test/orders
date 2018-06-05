export default class AddProductComponent {

  constructor($scope) {
    this.$scope = $scope;
    this.$scope.product = {
      isNew: false,
      id: null,
      name: null,
      price: null,
      qty: null
    }
  }

  addProduct() {
    const product = this.$scope.product;
    let payload;

    if (!product.isNew) {
      const { id, qty } = product;
      
      payload = { 
        id: parseInt(id), 
        qty: parseInt(qty) 
      };
    } else {
      const { name, price, qty } = product;
      
      payload = { 
        name, 
        price: parseFloat(price), 
        qty: parseInt(qty)
      };
    }

    return this.onAdd({ product: payload });
  }
}

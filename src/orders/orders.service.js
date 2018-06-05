export default class OrdersService {
  constructor() {
    this.orders = [
      {id: 1, date: "01/01/2018", total: 2500, items: [{ id: 1, qty: 1 }, { id: 3, qty: 1 }]}, 
      {id: 2, date: "02/01/2018", total: 170, items: [{ id: 2, qty: 1 }, { id: 4, qty: 3 }]},
      {id: 3, date: "03/01/2018", total: 1200, items: [{ id: 5, qty: 1 }, { id: 6, qty: 1 }]}
    ];

    this.products = {
      1: { name: "Computer", price: 2000 },
      2: { name: "Keyboard", price: 50 },
      3: { name: "Monitor", price: 500 },
      4: { name: "Mouse", price: 40 },
      5: { name: "Phone", price: 800 },
      6: { name: "Watch", price: 400 },
    }
  }

  getOrders() {
    return Promise.resolve(this.orders);
  }
  
  getProductsCatalog() {
    const products = Object.keys(this.products).map(key => ({
      id: parseInt(key),
      ...this.products[key]
    }));
    return Promise.resolve(products);
  };

  addProductToCatalog({name, price}) {
    const id = Object.keys(this.products).length + 1;
    this.products[id] = { name, price };

    return Promise.resolve({id, name, price});
  }

  getOrderProducts(orderIdStr) {
    const orderId = parseInt(orderIdStr);

    if (isNaN(orderId)) {
      return Promise.reject();
    }

    const order = this.orders.find(order => order.id === orderId);

    if (!order) {
      return Promise.reject();
    }

    const products = order.items.map(item => {
      const product = this.products[item.id];

      return {
        ...item,
        ...product
      }
    });

    return Promise.resolve(products);
  }

  placeOrder(products) {
    const id = this.orders[this.orders.length-1].id + 1;
    const total = products.reduce((p, n) => p += n.price*n.qty, 0);
    const date = new Date().toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const fill = n => n < 10 ? '0'+n : n;

    const order = {
      id,
      total,
      date,
      items: products.map(product => ({id: product.id, qty: product.qty}))
    };

    this.orders.push(order);

    return Promise.resolve(order);
  }
}

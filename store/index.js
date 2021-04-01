export const state = () => ({
  cartIsOpen: false,
  hasLogin: false,
  products: [
    {
      id: 1,
      title: "Product A",
      description: "Model A",
      price: 229.9,
      installments: 4,
      isFreeShipping: true,
      image: "1abc9c"
    },
    {
      id: 2,
      title: "Product B",
      description: "Model B",
      price: 199.9,
      installments: 3,
      isFreeShipping: true,
      image: "2980b9"
    },
    {
      id: 3,
      title: "Product C",
      description: "Model C",
      price: 29.9,
      installments: 2,
      isFreeShipping: true,
      image: "9b59b6"
    },
    {
      id: 4,
      title: "Product D",
      description: "Model D",
      price: 429.9,
      installments: 4,
      isFreeShipping: true,
      image: "e74c3c"
    },
    {
      id: 5,
      title: "Product E",
      description: "Model E",
      price: 369.9,
      installments: 3,
      isFreeShipping: true,
      image: "f1c40f"
    },
    {
      id: 6,
      title: "Product F",
      description: "Model F",
      price: 929.9,
      installments: 12,
      isFreeShipping: true,
      image: "bdc3c7"
    }
  ],
  productsAdded: []
});

export const mutations = {
  addToCart(state, { productId, quantity }) {
    const product = state.productsAdded.find(
      item => item.productId === productId
    );

    if (product) {
      product.quantity += quantity;
      return;
    }
    state.productsAdded.push({
      productId,
      quantity
    });

    // mixpanel test
    mixpanel.track("addToCart", { quantity: quantity, productId: productId });
  },

  removeItem(state, productId) {
    const product = state.productsAdded.find(
      item => item.productId === productId
    );

    // mixpanel test
    mixpanel.track("removeFromCart", {
      quantity: product.quantity,
      productId: productId
    });

    const indexToRemove = state.productsAdded.findIndex(
      item => item.productId === productId
    );
    state.productsAdded.splice(indexToRemove, 1);
  },

  openCart(state) {
    state.cartIsOpen = true;

    // mixpanel test
    const totalQuantity = state.productsAdded.reduce(
      (previous, current) => previous + current.quantity,
      0
    );

    mixpanel.track("openCart", { totalQuantity: totalQuantity });
  },

  closeCart(state) {
    state.cartIsOpen = false;

    // mixpanel test
    mixpanel.track("closeCart");
  },

  doLogin(state, loginName) {
    state.hasLogin = true;

    // mixpanel test
    mixpanel.track("Login success", {
      Name: loginName
    });
  },

  doLogout(state) {
    state.hasLogin = false;

    // mixpanel test
    mixpanel.track("Logout success");
  },

  buyAll(state) {
    console.log("buy all, subtotal:", this.getters.subtotal);

    // mixpanel test
    mixpanel.track("Buy all", {
      Subtotal: this.getters.subtotal
    });

    // Track Revenue
    mixpanel.people.track_charge(this.getters.subtotal);

    state.productsAdded = [];
  }
};

export const getters = {
  order(state) {
    function createOrderItem(item) {
      return {
        quantity: item.quantity,
        product: state.products.find(p => p.id === item.productId)
      };
    }

    return state.productsAdded.map(item => createOrderItem(item));
  },

  totalQuantity(state) {
    return state.productsAdded.reduce(
      (previous, current) => previous + current.quantity,
      0
    );
  },

  subtotal(state) {
    return state.productsAdded.reduce((previous, current) => {
      const price = state.products.find(item => item.id === current.productId)
        .price;
      const totalPrice = price * current.quantity;
      return previous + totalPrice;
    }, 0);
  }
};

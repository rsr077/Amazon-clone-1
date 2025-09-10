/* This code defines an object called cartManager, which is responsible for managing the shopping cart data.

It has a property cart, which will hold the current items in the cart, and a method loadFromStorage(). The purpose of loadFromStorage is to initialize the cart.

First, it tries to load the cart from the browser’s localStorage by calling localStorage.getItem('cart') and parsing it from JSON. If a saved cart exists, it will assign it to this.cart. If not, it falls back to a default cart with two predefined products.

This ensures that whenever the application starts, the cart is always available — either loaded from storage or initialized with default data.

This approach is useful in e-commerce applications because it preserves the user’s cart between sessions and guarantees that the cart is never undefined.
 */



export const cartManager = {
  cart: undefined,

  loadFromStorage: function () {
    // Try to load cart from localStorage
    this.cart = JSON.parse(localStorage.getItem('cart'));

    // If nothing in localStorage, set default cart
    if (!this.cart) {
      this.cart = [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }
      ];
    }
  }
};

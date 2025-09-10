/* Start with what the code does overall: “This code initializes or loads the cart.”

Explain how it checks localStorage.

Explain the default cart creation.

End with why we export it. */


/* This code is used to initialize the shopping cart in a web application.
First, it tries to load the cart from the browser's localStorage using localStorage.getItem('cart'). Since localStorage stores everything as strings, we use JSON.parse to convert it back into a JavaScript array.
Then, we check if the cart exists. If it doesn’t—meaning the user has not added anything before—we create a default cart with some predefined products. Each product object contains a productId, a quantity, and a deliveryOptionId.
Finally, we export this cart variable so it can be used in other modules of the application." */


export let  cart = JSON.parse( localStorage.getItem('cart'));

 if(!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2 ,
    deliveryOptionId: '1'
 },{
 
   productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
 }];
 }



/* The saveToStorage function saves the current cart in the browser’s localStorage. It converts the cart array into a string using JSON.stringify and stores it under the key 'cart'. This way, the cart data persists even if the user reloads or closes the page." */

function saveToStorage() {
   localStorage.setItem('cart', JSON.stringify(cart))
}


/* The addToCart function adds a product to the shopping cart. It first checks if the product already exists in the cart. If it does, it increases the quantity by one. If not, it creates a new item with that product ID and a default delivery option. Finally, it calls saveToStorage() to save the updated cart into localStorage so the data is not lost on page refresh." */

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
     if(productId === cartItem.productId){
       matchingItem = cartItem;
       
     }
  });

  if (matchingItem) {
    matchingItem.quantity +=1;
   }else {
      cart.push({
        productId: productId, 
        quantity: 1,
        deliveryOptionId: '1'
    });
     
  }

   saveToStorage();
}

/* This function is called removeFromCart, and its purpose is to remove a specific product from the shopping cart based on its productId.

Here’s how it works: First, it creates a new empty array called newCart. Then it loops over all the items in the current cart. For each item, it checks whether the item’s productId matches the one we want to remove. If it doesn’t match, that item gets pushed into the newCart. If it does match, we skip it, which effectively removes that product.

After the loop finishes, we replace the old cart with this new filtered cart, so the unwanted product is gone. Finally, the function calls saveToStorage() to persist the updated cart, usually in local storage or a database, so the data isn’t lost when the page reloads.

For example, if the cart has [1, 2, 3] and we call removeFromCart(2), the result will be [1, 3].

The same logic could also be written more concisely using JavaScript’s filter method, but this implementation makes the steps very explicit and easy to follow.
 */
 export function removeFromCart(productId){

  const newCart = [];

  cart.forEach((cartItem)=> {
    if(cartItem.productId !== productId) {
       newCart.push(cartItem);
    }
  });

  cart  = newCart;

  saveToStorage()

 }


 // add to date 
 // 
/*   This function updates the delivery option for a specific product in the cart. It works by looping through all the cart items until it finds the one with the matching productId. Once it finds that product, it updates its deliveryOptionId property with the new delivery option that was passed in. Finally, it calls saveToStorage() so the updated cart is persisted.

For example, if a product in the cart currently has a standard delivery option and I call updateDeliveryOption with express, that product’s delivery option will be updated to express. */
 
 export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
     if(productId === cartItem.productId){
       matchingItem = cartItem;
       
     }
  });

     matchingItem.deliveryOptionId = deliveryOptionId
     saveToStorage();
 }
import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products ,getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/monery.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";


/* 
The renderOrderSummary function dynamically builds the checkout order summary. It loops through each item in the cart, gets product details and delivery options, and uses dayjs to calculate the expected delivery date. For each item, it generates HTML with product info, quantity, delete button, and delivery options.

Event listeners are then attached: when a product is deleted, it’s removed from the cart and DOM, and the payment summary is updated. Similarly, when the user changes a delivery option, the cart is updated, and both the order and payment summaries are re-rendered.

This ensures the checkout page stays synchronized with the cart state at all times. */




/* 
cart → shopping cart data.

removeFromCart → deletes a product.

updateDeliveryOption → updates shipping choice for a product.

getProduct → retrieves product info (name, price, image).

formatCurrency → converts cents into a formatted price.

dayjs → library for working with dates.

deliveryOptions, getDeliveryOption → available shipping options.

renderPaymentSummary → re-renders payment totals after changes. */



/* Main Function: renderOrderSummary()

This function builds the HTML for each item in the cart.

a) Looping through the cart

Gets product details from products.js.

Gets the currently selected delivery option.




 */

export function renderOrderSummary() {
    
let cartSummaryHTML = '';

cart.forEach((cartItem) => {
 const productId = cartItem.productId;


     const matchingProduct = getProduct(productId);

   

     const deliveryOptionId  = cartItem.deliveryOptionId;

     let deliveryOption = getDeliveryOption(deliveryOptionId);
/* b) Calculating delivery date
Uses dayjs to add delivery days.

Formats it like "Tuesday, September 10". */

     const today = dayjs();
     const deliveryDate  = today.add(
       deliveryOption.deliveryDays,
       'days'
     );

     const dataString  = deliveryDate.format(
       'dddd, MMMM D'
     );

/* 
     c) Building the cart item HTML

Shows product name, image, price, quantity, and delivery date.

Adds Delete and Delivery option selector. */

     cartSummaryHTML +=


`   <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dataString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                   ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                 ${deliveryOptionsHTML(matchingProduct ,cartItem)}
              </div>
            </div>
          </div>
`

});


/* Helper Function: deliveryOptionsHTML()

This generates the radio buttons for shipping choices.
Loops through all shipping options.

Builds radio buttons with delivery date + price.

Marks the current selection as checked. */



 function deliveryOptionsHTML(matchingProduct,
  cartItem
 ) {
    let html  = '';

      deliveryOptions.forEach((deliveryOption)=> {
        const today = dayjs();
        const deliveryDate  = today.add(
          deliveryOption.deliveryDays,
          'days'
        );

        const dataString  = deliveryDate.format(
          'dddd, MMMM D'
        );

          const priceString  = deliveryOption.priceCents === 0
          ? 'FREE'
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

          const isChecked  = deliveryOption.id  === 
          cartItem.deliveryOptionId;


           html +=

         `      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}"">

                  <input type="radio"
                    ${isChecked ? 'checked': ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                        ${dataString}
                    </div>
                    <div class="delivery-option-price">
                  ${priceString} Shipping
                    </div>
                  </div>
                </div>`

      });


       return html;
 }

/* Injecting into DOM
Inserts all the generated HTML into the page. */

document.querySelector('.js-order-summary')
.innerHTML = cartSummaryHTML;

/* Delete Functionality
When Delete is clicked:

Removes item from cart.

Removes the HTML container.

Updates payment summary. */

document.querySelectorAll('.js-delete-link')
.forEach((link) => {
   link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);


     const container =  document.querySelector(
      `.js-cart-item-container-${productId}`

    );
       container.remove();
       renderPaymentSummary();
   });
});

// add to date

/* 6. Change Delivery Option
When user picks another delivery option:

Updates delivery option in cart.

Re-renders the order summary (so delivery date + checked radio refresh).

Re-renders payment summary (so shipping cost & total update). */

document.querySelectorAll('.js-delivery-option')
.forEach((element )=> {
   element.addEventListener('click', () => {
   const {productId, deliveryOptionId} = element.dataset;
     updateDeliveryOption(productId, deliveryOptionId);
     renderOrderSummary();

      renderPaymentSummary()

   });
});
}


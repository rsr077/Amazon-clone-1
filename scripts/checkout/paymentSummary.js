
/* The renderPaymentSummary function calculates and displays the checkout order summary. It first loops through the cart, multiplying each product’s price by its quantity, and also adds the cost of the selected delivery option.

Then it computes the subtotal, applies a 10% tax, and calculates the final total. The results are formatted into HTML using a template string and injected into the checkout page’s .js-payment-summary container.

This makes the checkout page dynamic—whenever the cart changes, calling this function updates the totals automatically.
 */

import { cart } from "../../data/cart.js"; 
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import{formatCurrency} from '../utils/monery.js';
 
 export function renderPaymentSummary() {
   let productPriceCents  = 0;
   let ShippingPriceCents = 0;

   cart.forEach((cartItem) => {
      const product = getProduct(cartItem.productId);
    productPriceCents +=   product.priceCents * cartItem.quantity 

    const deliveryOption =  getDeliveryOption(cartItem.deliveryOptionId);

    ShippingPriceCents += deliveryOption.priceCents;
   });
      
   const totalBeforeTaxtCents  = productPriceCents + ShippingPriceCents ;
   const taxCetns  = totalBeforeTaxtCents * 0.1;
   const totalCents  = totalBeforeTaxtCents + taxCetns;

     
   const paymentSummaryHTML = `
   
     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${formatCurrency(ShippingPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxtCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${formatCurrency(taxCetns)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>

   `;

     document.querySelector('.js-payment-summary')
      .innerHTML = paymentSummaryHTML;

      

      
  }


 
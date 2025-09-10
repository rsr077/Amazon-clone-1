
/* This code initializes the checkout page by importing and calling two rendering functions. The first one, renderOrderSummary, is in charge of showing the products and delivery information the customer has chosen. The second, renderPaymentSummary, calculates and displays the payment details such as subtotal, shipping, and total. By separating them into different modules, the code stays clean, modular, and easier to maintain. */

import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";


renderOrderSummary();
 renderPaymentSummary();
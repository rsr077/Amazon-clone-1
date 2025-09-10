/* The formatCurrency function converts a price stored in cents into a properly formatted dollar string with two decimals. It rounds the value, divides by 100, and uses toFixed(2). For example, 2095 becomes "20.95".

It’s exported both as a named and default export, which makes it flexible to import in different ways depending on coding style or project setup. */

export function formatCurrency(priceCents) {
  return (Math.round( priceCents) /100).toFixed(2)
}


export default formatCurrency;
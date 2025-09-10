
/* This module defines available delivery options and provides a helper function to retrieve them. The deliveryOptions array contains objects with id, deliveryDays, and priceCents.

The function getDeliveryOption takes an ID and searches through the array. If it finds a matching delivery option, it returns it. If no match is found, it returns a default option, which is the first one in the array.

For example, if I call getDeliveryOption('2'), it returns the 3-day delivery option. If I pass an invalid ID, it safely falls back to the 7-day free delivery option. This guarantees that the function always returns a valid delivery choice. */


export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
 }, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
 }, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
 }]

 export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
 }
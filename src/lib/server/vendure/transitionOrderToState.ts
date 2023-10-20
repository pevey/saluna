import { gql } from '$lib/generated'
import { query } from '.'

export const transitionOrderToState = async function(state: string) {
   const TransitionOrderToState = gql(`
      mutation TransitionToState($state: String!) {
         transitionOrderToState(state: $state) {
            ...ActiveOrder
            ...on OrderStateTransitionError {
               errorCode
               message
               transitionError
               fromState
               toState
            }
         }
      }
      fragment ActiveOrder on Order {
         __typename
         id
         code
         couponCodes
         state
         currencyCode
         totalQuantity
         subTotal
         shipping
         total
         totalWithTax
         taxSummary {
            description
            taxRate
            taxBase
            taxTotal
         }
         discounts {
            description
            amountWithTax
         }
         lines {
            id
            unitPrice
            unitPriceWithTax
            quantity
            linePrice
            linePriceWithTax
            productVariant {
               id
               name
               sku
               product {
                  slug
               }
            }
            featuredAsset {
               id
               preview
            }
         }
         shippingLines {
            shippingMethod {
               description
            }
            priceWithTax
         }
      }
   `)
   return await query({ document: TransitionOrderToState, variables: { state } })
      .then((response) => response?.json())
      .then((body) => body?.data?.activeOrder)
      .catch(() => { return null })
}
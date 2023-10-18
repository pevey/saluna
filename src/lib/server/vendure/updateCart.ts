import type { Cookies } from '@sveltejs/kit'
import { gql } from '$lib/generated'
import { query, parseAuthCookie } from './'

export const updateCart = async function(locals: any, cookies: Cookies, orderLineId: string, quantity: number) {
   const UpdateCart = gql(`
      mutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {
         adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
            ...ActiveOrder
            ... on ErrorResult {
                  errorCode
                  message
            }
         }
      }
   `)
   const response = await query({ document: UpdateCart, variables: { orderLineId, quantity }, locals })
   if (!response) return null

   // Capture the credentials if new session is initiated for non-logged-in user when adding to cart
   await parseAuthCookie(response.headers.getSetCookie(), locals, cookies)

   return await response.json()
   .then((body:any) => body?.data?.adjustOrderLine)
   .catch((e: Error) => {
      console.log(e)
      return null
   })
}
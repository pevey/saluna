import type { RequestHandler } from './$types'
import { validateToken } from 'sveltekit-turnstile'
import { error, json } from '@sveltejs/kit'
import { setOrderState, getCustomerAddresses, getOrderPaymentMethods, createStripePaymentIntent } from '$lib/server/vendure'

export const POST: RequestHandler = async ({ request, locals }) => {
   const data = await request.json()
   let token = data.token as string
	if (!await validateToken(token, locals.config.turnstile.privateKey)) {
      throw error(420, { message: 'Bot risk' })
   }
   const promises = Promise.all([
      // setOrderState(locals, 'AddingItems'),
      getCustomerAddresses(locals),
      getOrderPaymentMethods(locals),
      createStripePaymentIntent(locals)   
   ])
   // const [_, addresses, paymentOptions, paymentIntent] = await promises
   const [addresses, paymentOptions, paymentIntent] = await promises
   const contacts = getContacts(addresses)
	return json({ contacts, paymentOptions, paymentIntent })
}

function getContacts(addresses: any[] = []) {
   let contacts = []
   for (let address of addresses) {
      contacts.push({
         name: address.fullName,
         address: {
            line1: address.streeLine1,
            line2: address.streetLine2,
            city: address.city,
            state: address.province,
            postal_code: address.postalCode,
            country: address.country.toUpperCase(),
         }
      })
   }
   return contacts
}
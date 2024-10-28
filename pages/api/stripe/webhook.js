import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export default async function handler(req, res) {
    const sig = req.headers['stripe-signature']

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
    } catch (error) {
        console.log(`Webhook Error: ${error.message}`)
        return res.status(400).send(`Webhook Error: ${error.message}`)
    }

    switch (event.type) {
        case 'customer.subscription.created':
          console.log(event.type)
          break;
        case 'customer.subscription.updated':
          console.log(event.type)
          break;
        case 'customer.subscription.deleted':
          console.log(event.type)
          break;
        default:
          console.log(`Unhandled event type ${event.type}`)
    }

    res.json({ received: true })
}

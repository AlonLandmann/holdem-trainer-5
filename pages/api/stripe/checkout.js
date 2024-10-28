import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PRODUCTS = {
  'HT-Pro': 'price_1PO8mbLidVQLu7tO3heUSxkT',
  'HT-Elite': 'price_1QEMadLidVQLu7tOibgeN3be'
}

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price: PRODUCTS[req.query.productName],
              quantity: 1,
            }
          ],
          mode: 'subscription',
          success_url: `${req.headers.origin}/pricing?success=true&productName=${req.query.productName}`,
          cancel_url: `${req.headers.origin}/pricing?canceled=true`,
        })

        res.redirect(303, session.url);

      default:
        return res.status(400).json({ success: false, message: 'Invalid request.' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}


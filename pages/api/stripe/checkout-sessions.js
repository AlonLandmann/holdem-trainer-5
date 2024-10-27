const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price: 'prod_QEc0w34VBgPZjC',
              quantity: 1,
            },
            {
              price: 'prod_QPXKG1rWSSFJSN',
              quantity: 1,
            }
          ],
          mode: 'subscription',
          success_url: `${req.headers.origin}/pricing?success=true`,
          cancel_url: `${req.headers.origin}/pricing?canceled=true`,
        });
        return res.redirect(303, session.url);

      default:
        return res.status(400).json({ success: false, message: 'Invalid request.' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}


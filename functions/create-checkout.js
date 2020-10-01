const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.handler = async (event) => {
  const { email } = JSON.parse(event.body);
  // const product = inventory.find((p) => p.sku === sku);
  //const validatedQuantity = quantity > 0 && quantity < 11 ? quantity : 1;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
  //  billing_address_collection: 'auto',
    success_url: `${process.env.URL}/success`,
    cancel_url: process.env.URL,
    mode: 'subscription',
    customer_email: email, 
    line_items: [
      {
        price: 'price_1HX6GnFlxrdsMvOD9bUgGlXy',
        quantity: 1,
      },
    ], 
  });

  console.log(session);

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
};
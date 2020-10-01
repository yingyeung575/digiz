const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.handler = async (event) => {
  //const { sku, quantity } = JSON.parse(event.body);
  // const product = inventory.find((p) => p.sku === sku);
  //const validatedQuantity = quantity > 0 && quantity < 11 ? quantity : 1;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    success_url: `${process.env.URL}/success`,
    cancel_url: process.env.URL,
    line_items: [
      {
        name: 'Test name',
        description: 'Test description',
     //   images: [product.image],
        amount: 100,
        currency: 'USD',
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
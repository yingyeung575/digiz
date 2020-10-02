const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fetch = require('node-fetch');
const { faunaFetch } = require('./utils/fauna');

exports.handler = async ({ body, headers }, context) => {
  try {
    // make sure this event was sent legitimately.
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET_SUCCED_PAYMENT,
    );

    console.log('type');
    console.log(stripeEvent.type);
    console.log('data');
    console.log( stripeEvent.data.object);
    console.log('context');
    console.log(context.clientContext);

    // bail if this is not a subscription update event
    if (stripeEvent.type !== 'payment_intent.succeeded') return;

    const result = await faunaFetch({
      query: `
          query ($email: String!) {
            getUserByEmail(email: $email) {
              netlifyID
            }
          }
        `,
      variables: {
        email: context.clientContext.receipt_email,
      },
    });

    const { netlifyID } = result.data.getUserByEmail;
    console.log('netlifyID');
    console.log(netlifyID);
 
    

   

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };

  } catch (err) {
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }
};
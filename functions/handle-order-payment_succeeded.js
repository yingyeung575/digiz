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

 
    console.log( stripeEvent.data.object);

    // bail if this is not a subscription update event
    if (stripeEvent.type !== 'payment_intent.succeeded') return;

    console.log( 'context');
    console.log( context);

    // store the Netlify and Stripe IDs in Fauna
    /*
    await faunaFetch({
        query: `
        mutation ($netlifyID: ID!, $stripeID: ID!) {
            createUser(data: { netlifyID: $netlifyID, stripeID: $stripeID }) {
            netlifyID
            stripeID
            }
        }
        `,
        variables: {
        netlifyID: user.id,
        stripeID: stripeEvent.data.object.customer,
        },
    });
 
    */
   

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
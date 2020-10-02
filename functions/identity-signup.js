const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./utils/fauna');

exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);

  // create a new customer in Stripe
//  const customer = await stripe.customers.create({ email: user.email });

  // subscribe the new customer to the free plan
/*  await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: process.env.STRIPE_DEFAULT_PRICE_PLAN }],
  }); */

  // store the Netlify and Stripe IDs in Fauna

  await faunaFetch({
    query: `
      mutation ($netlifyID: ID!, $stripeID: ID!, $email: String!) {
        createUser(data: { netlifyID: $netlifyID, stripeID: $stripeID, email: $email }) {
          netlifyID
          stripeID
          email
        }
      }
    `,
    variables: {
      netlifyID: user.id,
      stripeID: '',
      email: user.email
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};
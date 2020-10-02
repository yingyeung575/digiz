const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./utils/fauna');

exports.handler = async (event) => {
 // const { user } = JSON.parse(event.body);

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
      netlifyID: 'netidfuck',
      stripeID: 'stripid',
      email: 'someemail'
    },
  })
  .then( r => console.log(r))
  .error( r => console.log(r))
  ;

  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ['basic'],
      },
    }),
  };
};
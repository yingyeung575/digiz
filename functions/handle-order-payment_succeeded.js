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

    // bail if this is not a subscription update event
    if (stripeEvent.type !== 'payment_intent.succeeded') return;

    console.log('type');
    console.log(stripeEvent.type);
    console.log('data');
    console.log( stripeEvent.data.object.charges.data[0]);
    console.log('context');
    console.log(context.clientContext); 

      //db

      const result = await faunaFetch({
        query: `
            query ($email: String!) {
              getUserByEmail(email: $email) {
                _id
                netlifyID
              }
            }
          `,
        variables: {
          email: stripeEvent.data.object.charges.data[0].billing_details.email,
        },
      });

      console.log('result');
      console.log(result);
      
      const netlifyID = result.data.getUserByEmail.netlifyID;
      const entryID = result.data.getUserByEmail._id;
      
      console.log('netlifyID');
      console.log(netlifyID);
      console.log(entryID);
      
      
      
      await faunaFetch({
        query: `
          mutation ($netlifyID: ID!, $stripeID: ID!, $email: String!, $entryID: ID!) {
            updateUser(
              id: $entryID
              data: { 
                netlifyID: $netlifyID, stripeID: $stripeID, email: $email 
              }) {
              netlifyID
              stripeID
              email
            }
          }
        `,
        variables: {
          netlifyID: netlifyID,
          stripeID: stripeEvent.data.object.customer,
          email: stripeEvent.data.object.receipt_email,
          entryID: entryID
        },
      });
  
      //db

      const role = 'prod_IEgFNo0gAOx3jH';

      // send a call to the Netlify Identity admin API to update the user role
      const { identity } = context.clientContext;
      await fetch(`${identity.url}/admin/users/${netlifyID}`, {
        method: 'PUT',
        headers: {
          // note that this is a special admin token for the Identity API
          Authorization: `Bearer ${identity.token}`,
        },
        body: JSON.stringify({
          app_metadata: {
            roles: [role],
          },
        }),
      });
 
    

   

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
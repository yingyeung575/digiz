const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./utils/fauna');

exports.handler = async (event) => {
 // const { user } = JSON.parse(event.body);

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
    email: 'test2@mtache.com',
  },
});

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
    stripeID: 'newstripeid',
    email: 'test2@mtache.com',
    entryID: entryID
  },
});




  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ['basic'],
      },
    }),
  };
};
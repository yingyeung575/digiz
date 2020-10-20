
    exports.handler = async (event, context) => {
    
  //  let temp = JSON.parse(event.body);

  const { user } = context.clientContext;
  console.log(user);

  const roles = user ? user.app_metadata.roles : false;
  console.log(roles);
  if (roles[0] == 'admin') {
    return {
        statusCode: 200,
        body: JSON.stringify('admin'),
    };
  }
  else if (roles[0] == 'prod_IEgFNo0gAOx3jH') {
    return {
        statusCode: 200,
        body: JSON.stringify('Pro Test - prod_IEgFNo0gAOx3jH'),
    };
  }
 /* else if (roles[0] == 'prod_I7KxTtCzcWgIum') {
    return {
        statusCode: 200,
        body: JSON.stringify('basic - prod_I7KxTtCzcWgIum'),
    };
  } */

    return {
      statusCode: 200,
     // body: JSON.stringify(temp.type),
      body: JSON.stringify('no plan'),
    };
  };

 

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
  else if (roles[0] == 'prod_I7KwO1xIk9FxFB') {
    return {
        statusCode: 200,
        body: JSON.stringify('Pro'),
    };
  }
  else if (roles[0] == 'prod_I7KxTtCzcWgIum') {
    return {
        statusCode: 200,
        body: JSON.stringify('basic'),
    };
  }

    return {
      statusCode: 200,
     // body: JSON.stringify(temp.type),
      body: JSON.stringify('nocontent'),
    };
  };

 
const {GraphQLError} = require('graphql');
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  // function for our authenticated routes
  authMiddleware: function ({req}) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;


    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    // - to show user token => console.log('token: ', token);
    if (!token) {
      return req ; //res.status(400).json({ message: 'You have no token!' });
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // - to show user info => console.log('data', data);
      req.user = data;
    } catch(err) {
      //console.log(err);  
      console.log('Invalid Token: ', err); //TODO: review this!
      //return res.status(400).json({ message: 'invalid token!' });
    }

    // send to next endpoint
    return req; //next();
  },
  signToken: function ({ email, _id, firstName, lastName }) {
    const payload = { email, _id, firstName, lastName };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

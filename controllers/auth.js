

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const request = require('request');
const config = require('../config');

// Authentication Middleware
// This middleware will check access token in authorization headers of a request
// It will verify access token against Auth0 JSON web key set
exports.checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        jwksRequestsPerMinute: 10,
        jwksUri: 'https://next-portfolio.us.auth0.com/.well-known/jwks.json',
    }),
    audience: 'https://next-portfolio.us.auth0.com/api/v2/',
    issuer: 'https://next-portfolio.us.auth0.com/',
    algorithms: ['RS256']
});

exports.checkRole = role => (req, res, next) => {
    const user = req.user;
    console.log(user);
    if(user && user[config.AUTH0_NAMESPACE + '/roles'].includes(role)){
        next();
    } else{
        console.log('auth error');
        return res.status(401).send('Auth error');
    }
}

exports.getAccessToken = (callback) => {
    const options = {
      method: 'POST',
      url: config.AUTH0_TOKEN_URL,
      headers: {'content-type': 'application/json'},
      form: {
        grant_type: 'client_credentials',
        client_id: config.AUTH0_CLIENT_ID,
        client_secret: config.AUTH0_CLIENT_SECRET,
        audience: config.AUTH0_AUDIENCE
      }
    }
  
    return new Promise((resolve, reject) => {
      request(options, (error, res, body) => {
        if (error) {
          return reject(new Error(error))
        }
  
        resolve(body ? JSON.parse(body) : '')
      })
    })
}

exports.getAuth0User = accessToken => userId => {
    const options = {
        method: 'GET',
        url: `${config.AUTH0_AUDIENCE}users/${userId}?fields=family_name,given_name,picture,user_id,name`,
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    }
    return new Promise((resolve, reject) => {
        request(options, (error, res, body) => {
            if (error) {
                return reject(new Error(error))
            }
    
            resolve(body ? JSON.parse(body) : '')
        })
      })
}
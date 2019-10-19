# Integrating Auth0 to the Backend

> 10.17.2019

Carry-Me needs to have authentication on the backend routes to ensure that our data reamains safe from outside forces. One method of securing the database is by adding route guards to the Express routes I defined. Auth0 provides free authentication services for your applications, and is easy to integrate into projects. To integrate Auth0 into Carry-Me I created a unique identifier on the Carry-Me Auth0 account and assigned it to a variable that is used in a code snippet taken from Auth0. This code snippet checks to see if a token that is sent in the request headers is valid and issued from Auth0. If so then the route is accessible. 

To use this code, jut insert it into a route:

```javascript
const auth0 = require('./lib/auth0');
const Router = require('express').Router();

Router.get('/', auth0, (req, res) => {
  console.log(req.body);
});
```

[Back to ReadMe](../ReadMe.md);

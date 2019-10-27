# Integrating Auth0 Into the Carry-Me API

> October 16th 2019

In following with the tutorial I am going to secure the application with Auth0 by following these steps:

1. Regester the Carry-Me API on my Auth0 account.
2. Integrate Express with Auth0

___

## Register Carry-Me API on Auth0

The first step of this process involves creating a unique identifier for the application on Auth0. It cannot be modified. I have chosen to use the name carryme/api for this value.

This value is then set in my config file.

## Integrate Express with Auth0

First I add the following dependencies to the project:

- [express-jwt-authz](https://github.com/auth0/express-jwt-authz)
  - This allows for valiation of a JWT `scope` to authorize access to an endpoint.
- [express-jwt](https://github.com/auth0/express-jwt)
  - This allows authentication of HTTP requests using JWT tokens. This package is built for express and helps protects routes, checks agains secrets, and creates the `req.user` from the payload if the token can verify.
- [jwks-rsa](https://github.com/auth0/node-jwks-rsa)
  - This retrieves RSA signing keys froma JSON Web Key Set(jwks) endpoint.

The tutorial uses a Restify API and has to create a custom middleware function to verify the JWT and set the `req.user` body payload. I will not implement this function but I will take notes on it. Express-jwt handles this creation for me. I will add notes on that below as well.

- ##### Custom Middleware

This function takes options and checks to see if it has a `secret` property.

If it exisits then a vairable called `secretCallBack` is set to the value of `secret`.

The function sets values for:

- a callback being revoked
- if the request property is a user
- if there are required credentials, then hold their values in an object.
- a function that checks the headers for the value of `authorization` in request exists:

```javascript
 if (
      req.method === "OPTIONS" &&
      req.headers.hasOwnProperty("access-control-request-headers")
    ) {
      const hasAuthInAccessControl = !!~req.headers[
        "access-control-request-headers"
        ]
        .split(",")
        .map(function (header) {
          return header.trim();
        })
        .indexOf("authorization");

      // if (hasAuthInAccessControl) {
      //   return next();
      // }
    }
```

Note how it uses the  `.map()` function to trim the header string and find the index of the `authorization` word.

- a conditional that checks if a property exisits and **what type** the property should be returns some logic.

Essentially this funtion parses through different parameters in the headers and validates if they exisit or not. If they do then certain options such as `next()` or rejections are sent out.

**Honestly reading this file will teach me a lot about how security works**.

- ##### Express Setup

Create the file inside `/src/lib/` called `auth0.js`. This file contains the dynimcially generated code example from Auth0. It sets key functions and targets for HTTP requests to thea app. It can be called on routes by adding it to the params in the router file. How cool is that.
___
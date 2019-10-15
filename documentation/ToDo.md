# Tasks To Do

**Backend Tasks**
| Task | Complete |
| --- | --- |
| Add authentication on the backend | [ ] |
| Create a tested vehicle class and corresponding routes | [ ] |
| Update Contract model for bid history property | [ ] |
| Create property for holding pictures of a vehcile | [ ] |
| Write model tests | [ ] |
| Refactor Test files | [ ]|
| Discuss what features a driver should have | [ ] |
| Discuss what features an entity should have | [ ] |

___

**Frontend Tasks**

___

## NOTES

| Activity | Activity |
|--|--|
| [Auth0 refactor](#auth0-Refactor) | |

I need to understand write about MongoDB and Mongoose schemas in detail.
 
I need to understand why i'm using dotenv, morgan, and cors in the app setup.

I need to understand express setup.

| Task | Complete |
| --- | --- |
| Find api for car manufacturers and models | [ ] |

Interesting Schema Types:

- Unique: ensure that a unique index is created for this path. If the index already exists on the DB then it will not be replaced.

Since Carry-Me uses MongoDB as a DB and Mongoose as a framework, the Carry-Me relies on Schemas to create the structure of the classes.

### Auth0 Refactor

I am using [this tutorial](https://auth0.com/blog/developing-well-organized-apis-with-nodejs-joi-and-mongo/) as a guide.

- I created a config directory and added to the `.env` file. App configuration can vary between enviornments, so values that could change based on enviornment should be stored in a configurabale `.env` file.

- The next step was to create an export function in inside a `config` directory in the root of the server folder. `config.js` is an exported object which contains configuration properties for the app, the database, and the logger file.

- The next step that the tutorial takes me through is creating a custom middleware function that will intercept all server requests, check their status code and perform one of two functions.

- Inside `server/lib/jsend.js` I wrote the function that I will pass all client requests through. It contains logic, and two supporting functions.
    
    #### Logic
    
    When the function is called the incoming body is checked for the `Error` property on the request. If it exisits it passes it to `formatError()`. If it does not exist then it passes it to `formatSuccess()`. After the supporting funtions format the server response into a custom object, it is converted from JSON to a string, the headers for the `Content-Length` and the `Content-Type` are set and the stringified response is sent.

    #### Supporting Funtions

    #### - `formatError(res, body)`

  - Object oriented programming at it's finest. This function checks to see if the status code of the response is between 400 and 500 [(all failing coes)](https://httpstatuses.com/). If the code is failling, then it returns an object with just the status, the message, and the code. If the status code isn't failing then it checks the NODE_ENV `.env` key to returns an object with the status, message, code, and data properties to the `response` property within the function. All are set by ternairy(sp lol sorry) statements.

  #### - `formatSuccess(res, body)`

  - If `body.data && body.pagination` then return a custom object with pagination information.
    - > _Not sure pagination is yet_
  - Otherwise return simply a success message and the data.


1. Create `lib` directory in the root of the `server` directory.
2. Add file for middleware intercepting client requests function.
3. Reconfigure the `/server/index.js` and `/server/_tests_/app.js` files
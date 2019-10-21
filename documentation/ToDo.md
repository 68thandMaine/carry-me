# Tasks To Do

**Backend Tasks**
| Task | Complete |
| --- | --- |
| Show Mike how to set up a .env file | [ ] |
| Decide how to add ids to contracts. Frontend or backend? | [ ] |
| Write driver search for contracts logic and test | [ ] |
| Create Custom Functions for logging all important error information | [ ] |
| Update Contract model for bid history property | [ ] |
| Write model tests | [ ] |
| Refactor Test files | [ ]|
| Create a tested vehicle class and corresponding routes | [X] |
| Discuss what features a driver should have | [X] |
| Discuss what features an entity should have | [X] |
| Add authentication on the backend | [X] |

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

- To set up the looger create a `./app/lib`. Then require 3 properties from the the winston package:
  - transports: transports are essentially storage devices for the logs.
  - format
  - createLogger

  Then several formatting properties are retrieived from `winston.format`. Then the logger is created. Interestingly the file is a function that is called in the `module.exports` funtion. I believe that when the logger is instantiated with the `create()` method, an object containing the result of the logger function and the properties from format is returned. **Basically this creates a logger using Winston settings**

- To set up dependency injection we create a custom library called `service_locator`. This injects dependencies into the objects.

1. Create `lib` directory in the root of the `server` directory.
2. Add file for middleware intercepting client requests function.
3. Reconfigure the `/server/index.js` and `/server/_tests_/app.js` files so that they rely on the values of the config object. Make sure you instantiate it with ().
4. Set up the logger. Logger is provided through the Winston npm package.
5. Set up dependency injection. File is created in configs directory

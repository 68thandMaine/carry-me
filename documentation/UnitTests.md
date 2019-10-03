# Carry-Me Backend Tests

Carry-Me uses a Node server and the Express framework to handle persisting information to a MongoDB database.

I am using Jest to provide Unit test coverage for the Routes in Carry-Me and am using SuperTest to handle the HTTP requests that would be made. See below for the Setup.

## Jest Setup

The `jest.config.js` file contains predefined settings that are available to be uncommented out and configured. The Test Runner for Carry-Me uses the provided Global Tear Down to referance a method that removes all MongoDB collections after each test suite finishes running.
    - **`jest.global-setup.js`**: This file contains a function that deletes all MongoDB collections.

### Using SuperTest

Supertest allows easy use testing of API endpoints by wrapping the server file inside of the supertest construtor:

`const request = supertest(server)`

Once you do this you get the ability o perform CRUD functions in the test file.

It is important to note that most tutorials teach you to `listen` to the Express app on a particular port, but this won't work in testing due because each test file should start a server on their own with Supertest. By not listening to a singular Port, Supertest will work, but if the server file is bound to a single port, Supertest cannot create multiple servers on multiple ports.

> **Supertest app.js**  
`module.exports = app;`
> **Dev and Production index.js**  
`app.listen(PORT)
module.exports = app;`

**An area that can be improved on in Carry-Me is how I use Supertest. For Development and Production enviornments I have a file called index.js. index.js is used in the  `npm run start` script. I have a file called app.js in the _tests_ directory that is used by Supertest. The files are identical. There must be a way to configure one entry point to the server and be able to use Supertest.**

___

### Test Setup

Each test file will connect to a uniqe db, so I will use the `beforeAll()` method to setup db connecitions prior to running the test suite. As mentioned above, the teardown method is included in the `jest.global-teardown.js` file.

During testing we want to connect to a different db for each test file because Jest runs tests asynchronously and we shouldn't share test to the same db lest the information spills over to the next test file.

___ 

Shell commands for Mongo:

`mongo` - starts the Mongo CLI.

`dbs` - shows a list of databases
.
`use <db name>` - targets, and moves into a database.

`show collections` - shows all collections within the db.

`db.collectionName.find()` - shows the content of the collection.

___

### Testing Strategies

#### Entity Controller Unit Tests

To test the Entity Routes I have identified key behaviors that I expect to happen:

- **Create** : When creating a new Entity I expect the Status Code from the server to be 200, and for the Body to have value. If there is an error creating the Entity, then I expect a validation error message to be returned.
- **Read** : When reading from the DB I expect a 200 Status Code, and for the response body to be 1 or greater. If I am returning a specific entity, then I expect a 200 Status Code, and for the returned entity ID to match the ID used in get request.
- **Update** : When updating an existing Entity I expect for a 200 Status Code, for the response body to not be an empty object, and for the updated property to match the update.
- **Delete** : When deleting an Entity I expect for a 200 Status Code, and for the response text to be 'Deleted successfully'.

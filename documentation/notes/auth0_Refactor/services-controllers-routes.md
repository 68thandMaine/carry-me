# Services Controllers and Routes

## Services

Services handle the business logic associated with a model. I will refactor the project to match this design pattern.

Each service file constructor will need to be given the logger, the mongoose object, httpStatus, and any errs. The CRUD logic will be written in the service file rather than in the controller file.
Controllers now only pass along data to the service files and back out of the API.

After refactoring the controllers, I will update the `serviceLocator` file by registering all the dependencies within.

### Updating the Dependency Injection File

Inside of `/server/config/depInj.js` I have created registrations for the different dependencyies in the project and the components that use them. This allows dependency injection into my service files and my controllers. 

Note how this file uses the `ServiceLocator` class to register and return the differnt dependencies needed. It's a wrapper class in a way.


# Adding Dependency Injection to the Server

[Go Back to Logger Info](./logger.md)
[Return to ReadMe](../../../README.md)

___

Create the dependeny injection file inside the config folder where all dependencies are intiilzed.
  
  > `/server/config/depInj.js`

This file registers different dependencies for our project. Things like our database framework (mongoose), the httpStatus, and the dependency injection middleware.

##### How It Works

There are a series of dependencies that are added to the dependency map.

- logger
- http-status
- mongoose

These are run through the service locaer file to determine if the dependency is real. If is valid then it returns the necesssary dependencyies. **Is This A Security Feature To Know About?**

[Next we create the database config file(./databaseConfig.md)
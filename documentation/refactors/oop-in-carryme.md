# Refactor 1

> _10.17.2019_

## Implementing More Organized Code

The first version of the Carry-Me API contained code that was not as modular as it could be. The `index.js` file was polluted with code that could have it's own file and the way that the models, routes, and controllers interacted was less than idea. This refactor aimed to enable **dependency injection** and allow for a more **object oriented programming** architecture.

### Changes

- Removed the database connection from `index.js`
- Removed mongoose query logic from the controller files.

### Additions

- `config.js` file
- [`serviceLocator.js` file](#servicelocator.js)
- Logger
- Service files for each Model.

___

#### Notes

The first step of this refactor was to create the directories `lib` and `config`.

> The `config` directory holds customization objects for the database, dependency injection, and app configurations.

> The `lib` directoy holds customization classes for auth0, the logger, the service locator, and an HTTP response formatter function.

I then created an object that held configuration setting properties for the app.

```javascript
{
  app: {..},
  mongo: {..},
  application_logging{..},
}
```

The values of each property is a configuration setting that is declared in the `.env` file.

From here I am now able to call `config.app.name`etc in different areas of the application. For example after **removing the database connection logic** from the server, it was replaced by instantiating a `Database` object with properties setnt from `config.mongo.host`.

##### Database.js

> `/server/config/`

The Database class is created by sending a the environrmental variable values for the host and the database name. When is created a mongoose connection is created. What's nice is that this refactor includes the addition of a Logger file, so logs are created whenever a connection is created, errors, or is disconnected. **model dependencyies are listed the `connect` method.** This allows for Mongoose to know about the Schemas it needs.

___

##### depInj.js

> `server/config`

The dependency injection file contains custom functions that hold configurations of dependencies diffent files might need. For exampl:

**entityController() dependency** 

The `entityController` is not a controller. It is a set of custom dependency configurations ( `require = ('..'`) statements ) that return a call to a file. For example: 

```javascript
serviceLocator.register('entityService', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const mongoose = serviceLocator.get('mongoose');
  const httpStatus = serviceLocator.get('httpStatus');
  const EntityService = require('../src/services/EntityService')
  return new EntityService(log, mongoose, httpStatus);
});
```

In the above example a file that uses `entityService` can call make a call like `entityService.listAll()` and invoke the `listAll()` function in `EntityService`. 

`EntityService.js` won't require as much code now, because the depenedncies (require statements) are injected into the constructor rather than written at the top of the file.

```javascript
new EntityService(log, mongoose, httpStatus);
```

___

One of the most import additions of this refactor was the creation of the service locator. This file creates a memory file of different configurations declared by using  `serviceLocator.register()` that are called throughout the app.

##### ServiceLocator.js

This file contains a map and Cache object file for holding different configurations used in dependency injection. There are also two functions `register` and `get` that are critical for the functionality of dependency injection. 

`**register(dependencyName, constructor)**`

Validate the name and constructor, then add them as key value pairs to the dependencyMap.

`**get(dependencyName)**`

Validate the incoming dependency name.

Validate that the object in the map is not undefined.

If the object isn't cached, then cache it and return it. If it is in cache, then get it from cache.

Now by calling this method of registering configurations of dependencies and then creating an instantiation of a class object that requires those dependencies and then accessing their propertes of the classes by calling `serviceLocator.get(registerdName)`.

___

##### Service Files and Controllers

Previously Carry-Me held databaes logic in the controller files. This did not follow separation of concerns very well as this logic could exist in separate service files. The controller ought only to direct tracffic - not perform logic as well. The data querying logic for each model used in Carry-Me is held in model-specific files.

##### Routes

Routes are now accessed using dependency injections 

```javascript
server.get('/entity', (req, res, next) => serviceLocator.get('entityController').index(req, res, next));
```

As you can see the serviceLocator retrieves the eneityClass rather than exporting a function from an imported file. By using dependency injection and a serviceLocator the code is more loosely coupled and easier to read.

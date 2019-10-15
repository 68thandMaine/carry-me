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

I created a config directory and added to the `.env` file. App configuration can vary between enviornments, so values that could change based on enviornment should be stored in a configurabale `.env` file.

The next step was to create an export function in inside a `config` directory in the root of the server folder. `config.js` is an exported object which contains configuration properties for the app, the database, and the logger file. 
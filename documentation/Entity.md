I need to understand write about MongoDB and Mongoose schemas in detail.
 
I need to understand why i'm using dotenv, morgan, and cors in the app setup.

I need to understand express setup.

# Entity Class Information
> _**Env**: Node / Express Framework / Mongoose Framework_

###### [Back To ReadMe](../README.md)

Since Carry-Me uses MongoDB as a DB and Mongoose as a framework, the Carry-Me relies on Schemas to create the structure of the classes.

Interesting Schema Types:

- Unique: ensure that a unique index is created for this path. If the index already exists on the DB then it will not be replaced.

## Properties

### entityName

`type: String`

The `entityName` property is the value that is displayed to the public on a Carry-Me profile.

### email

`type: String`

The `email`  property is the value that is used to contact an entity by the Carry-Me admin, or by a Driver.

Also can be used for login.

### password

`type: String`

The `password` property is the value that is used during login for the entity.

### accountOwner_FirstName and accountOwner_LastName

`type: String`

The `accountOwner_FirstName` and `accountOwner_LastName` properties are the values that are used for correspondance between Carry-Me admin and the Entity account owner.

### accountOwner_PhoneType and accountOwner_PhoneNumber

`type: String`

The `accountOwner_PhoneType` and `accountOwner_PhontNumber` properties are the values used for connecting to an Entity account owner via phone.

If the `accountOwner_PhoneType` === 'CELL' then texting is an option.

### entityPhoneNumber

`type: String`

The `entityPhoneNumber` value is used by Drviers to contact the Entity.

### street, city, state, and zip

`type: String` and `type: Number`

The `street`, `city`, `state`, and `zip` values are all used for mail correspondence with an Entity.

### contracts

`type: Schena,Types.ObjectId`

The `contracts` property holds the ObjectId's of the various contracts that an Entity has. 

See the [Contract Information Document](./Contract.md) for more information on the Contract class.

### rating

`type: Number`

The `rating` property holds the numerical value of the rating of an Entity.

A Driver can rate an Entity based off of metrics such as:

- Ease of location
- Friendliness
- Response Time
- Reasonable Price
- etc

### messages

`type: Schema.Types.ObjectId`

The `messages` property holds the ObjectId's of message threads that an Entity can have with a Driver.

### createdAt

`type: Date`

The `createdAt` property holds the Date object that is created when an Entity account is created.

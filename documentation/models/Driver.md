# Driver Class
_[Return to Readme](../README.md)_

The driver class will be used to create new driver accounts. A driver must have a car and carrier in order to accept contracts from Entities.

___

## Properties

A driver is made up of a:

- first name
- last name
- address
- city
- state
- zip
- email
- phone number
- phone type
- contracts array
- payment info

___

## Creating a Driver

When a new driver is created, logic that determines if the **email** provided exists already. If it does then the account is not created.

_Carry-Me will not allow duplicate emails in the database_

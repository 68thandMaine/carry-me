# Carry Me

> Designed by Michael Necula and Chris Rudnicky

___

## Table of Contents

| Section | Title | Section | Title |
|--|--|--|--|
|**I.**|[Description](#I.-description) | **V.**|[Feature List](#V.-feature-list) |
|**II.**|[Installation](#II.-installation) | **VI.**| [Tools and Technology](#VI.-tools-and-technology) |
|**III.**|[Backend](#III.-backend) | **VII.**| [Considerations](#VII.-considerations)|
|**IV.** |[Frontend](#IV.-frontend) | **VIII.**| [Licensing](#VIII.-licensing) |


___

## I. Description

Carry Me is Uber/Lyft of the car transportation world. Here's the idea:

Entites (those who have vehicles that need to be transported from A to B) can set out contracts in an open market for drivers to transport. Drivers bid on the contracts within a given timeframe, and the winner of the bid gets paid. Simple.

___

## II. Installation

___

## III. Backend

### Classes

|||
|---|---|
| [Entity](./documentation/Entity.md)| [Contract](./documentation/Contract.md) |
| [Driver](./documentation/Driver.md)| [Vehicle](./documentation/Vehicle.md) |

#### To do:

- Look into authentication from the backend

- Add logger

___

## IV. Frontend

To do:

- Create directory structure
  - views
  - components
  - tests
  - assets
- Determine if using redux or hooks api is the best idea
- Create routes
- Create CI/CD pipeline
- Research amazon web services
- Develop mobile app with React Native or Flutter

___

## V. Feature List

Features that should be included in this project are:

- Authentication
- Google Maps Integration
- Messaging service from driver to entity

___

## VI. Tools and Technology

This project was built with:

- Reactjs + React Native
- Google Maps API
- Cypress
- Mocha Jest Chai
- SCSS
- Node
- Express
- Axios

___

## VII. Considerations

Several things to consider while building this application:

- Security
  - Express server sending cookies
  - Proxy file
  - Validation  

**For a list of bugs in Carry-Me [click here](./documentation/Bugs.md).**
___

## VIII

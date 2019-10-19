# Contract Class Information
> _Env: Node / Express Framework / Mongoose Framework_

###### [Back To ReadMe](../README.md)

## Properties

##### availability

`type: bool`
> defaults to true.

The `availability` property is used for displaying a contract.

##### entity

`type: Schema.Types.ObjectId`

The `entity` property is the ObjectId of the Entity who provided the contract.

##### driver

`type: Schema.Types.ObjectId`
> optional

The optional `driver` property is the ObjectId of the Driver who won the bid for the contract.

##### createdAt

`type: Date`

The `createdAt` property holds the date the Contract was issued.

##### vehicles

`type: Array`

The  `vehicles` property holds ObjectIds of the vehciles that are in an order.

**Note:** The number of vehicles will be shown in an order on the Client side - not the server side.

##### max_bid

`type: Number`

The `max_bid` property holds the maximum dollar amount an Entity is willing to pay for a Contract.

##### current_bid

`type: Number`

The `current_bid` property holds the current bid amount of a Contract as set by the different Drivers.

##### winning_bid

`type: Number`

The `winning_bid` property holds the value of the winning bid of a contract. Should be less than or equal to the `max_bid` value.

##### winning_Driver

`type: Schema.Types.ObjectId`

The `winning_Driver` property is the ObjectId of the driver who won the Contract.

##### location_start

`type: String`

The `location_start` property holds the pickup location of the contract. Value determined on client side. Stored as a string server side.

##### location_end

`type: String`

The `location_end` property holds the dropoff location of the contract. Value determined on client side. Stored as a string server side.

##### shipBy

`type: Date`

The `shipBy` value holds the date that the shipment needs to be made.

##### contractClosed

`type: Bool`

The `contractClosed` is a boolean that denotes if a contract has been completed. This value is different than the `availability` property in that the `availability` property is not meant to assess contrcat completedness, just visibility on the marketplace.

___

###### [Back To ReadMe](../README.md)
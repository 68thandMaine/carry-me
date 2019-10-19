# Vehcile Class
_[Return to Readme](../README.md)_

The Vehicle class will be used to create new vehicles. Entities are the only class that can create an instance of a vehcile.

___

## Properties

A vehicle is made up of a:

- Type
- Vehicle year
- Vehcile make
- Vehicle model
- Operable

___

## Planning

- Vehciles are created by entities and contracts. When an entity creates a contract vehicles are automatically created. What if my Vehicle collection was empty, but grew when new vehcicles were created by endities. It would be almost AI like. Basically when the Client starts, an api call to vehciles would return the vehicle collection. When vehciles are created they are autofilled from values in state. If there is no match, then the input vehicle is added to the collection. This will grow the db automatically. Maybe cut down on initial reliance on ouside api calls?

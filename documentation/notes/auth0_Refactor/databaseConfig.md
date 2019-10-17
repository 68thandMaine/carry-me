# Configuring the Carry-Me Database With OOP

The Database is a class. It is constructed by creating an object with the mongoose poperty and connection available on the api.

It contains a single mehtod that connects to the MongoDB server. We add listeners to listen to different events that might happen to the server, and we log their messages. Then we require all the models and intilize them before exporting the object.

[Next we create the `services`, `controllers`, and  `routes`](./services-controllers-routes.md)
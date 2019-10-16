# Notes on Creating the Logger

[Go Back to serviceLocator Info](./serviceLocator.md)
[Return to ReadMe](../../../README.md)

After creating the logger file

###### I will insert the notes in [ToDo.md](../ToDo.md) here.

I create a custom library that is an object with two values: a dependency map and a dependency cache. The dependencyMap is set whenever the ServiceLocator class is instantiated. I add several methods to the class that will set properties for the two objects:

- ##### `register(dependencyName, constructor)`

    1. Check to see if the constructor is a function. If it isn't `throw` an error.
    2. Check to see if there is a dependencyName. If there isn't `throw` and error.
    3. RETURN an array with one object named after the dependency inside. It should contain the information from the constructor.

- ##### get(dependencyName)

    1. Check to see if the dependencyName exisits. If it does not, then `throw` a new error message.
    2. Check to see if the object in the dependencyMap is a function. If it is not a function, then `throw` an error message.
    3. Check to see if the object in the dependencyMap is undefined.
    4. Check if the dependencyCache is empty. If it is then cache to the current object. The key is the name the value is the object.
    5. Return the cached object.

- ##### clear()

  - This method clears the dependencyMap and dependencyCache objects.

What is cool is that we can add multiple obects to the dependencyMap it seems.

[Next we will add dependency injection](./dependency-injection.md)

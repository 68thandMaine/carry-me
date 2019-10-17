
# Custom Validation for the Backend

The tutorial I am following uses [`joi`](https://github.com/hapijs/joi#example) to perform validation on the different schemas declared in route requests to the app.

It works by ensuring that objects that are required in the schema have validations run against them.

```javascript
module.exports = joi.object().keys({
  username: joi.string().alphanum().min(4).max(15).required(),
  birthdate: joi.date().required()
}).required();
```

As you can see this function is exported and performed on routes that have required `username` and `birthdate` properties in the schema.

After the files are created then I create a tiny library that runs validation each time a request is made. The tutorial uses restify-errors, but since Carry-Me is built with Express I will have to find a way around sending this information out of the library. It seems I willbe able to use the httpStatus library and still achieve part of the funtion of the validation library.

Perhaps I should use [Express Validator](https://express-validator.github.io/docs/)?

___


exports.compareObjects = (expected, received) => {
  const expectedLength = Object.getOwnPropertyNames(expected).length;
  const receivedLength = Object.getOwnPropertyNames(received._doc).length;
  expect(received).toHaveProperty('_id');
  expect(received).toHaveProperty('__v');
  // Test to see if the length of the original object has increased by 2.
  // Whenever an object is saved in Mongo it is given an _id property, and a _v property
  // that will add to the length of the original object.
  expect(receivedLength).toBe(expectedLength + 2);
};

exports.comparePropertiesAndValues = (expected, received) => {
  const expectedObject = Object.entries(expected);
  const receivedObject = Object.entries(received._doc);
  let matchedValues = 0;
  for (let i = 0; i < expectedObject.length; i += 1) {
    for (let j = 0; j < receivedObject.length; j += 1) {
      if (receivedObject[j].toString() == expectedObject[i].toString()) {
        matchedValues += 1;
        expect(receivedObject[j].toString()).toEqual(expectedObject[i].toString());
      }
    }
  }
  // Exected length -1 becasue of __v property
  expect(matchedValues).toBe(Object.keys(expected).length - 1);
};

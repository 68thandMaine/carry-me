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
  let matchedValues = 0;
  for (const expectedProperty in expected) {
    for (const receivedProperty in received._doc) {
      if (receivedProperty == expectedProperty) {
        matchedValues++;
        expect(received[receivedProperty].toString()).toEqual(expected[expectedProperty].toString());
      }
    }
    // Exected length -1 becasue of __v property
    expect(matchedValues).toBe(Object.keys(expected).length - 1);
  }
};

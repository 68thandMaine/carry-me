exports.compareObjects = (expected, received) => {
  const expectedLength = Object.getOwnPropertyNames(expected).length;
  const receivedLength = Object.getOwnPropertyNames(received).length;
  console.log(expectedLength)
  console.log(receivedLength)
  /** Test to see if received matches a subset of expected properties */
  expect(received).toMatchObject(expected);
  // Test to see if the length of the original object has increased by 2.
  // Whenever an object is saved in Mongo it is given an _id property, and a _v property
  // that will add to the length of the original object.
  expect(receivedLength).toBe(expectedLength + 2);
};

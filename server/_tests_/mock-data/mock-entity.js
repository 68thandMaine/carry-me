const correctEntry = {
  entityName: 'Anderson Valley Group',
  email: 'andersoncorp@gmail.com',
  password: 'vallygurl13',
  accountOwner_FirstName: 'Fred',
  accountOwner_LastName: 'Ackerson',
  accountOwner_PhoneType: 'Cell',
  accountOwner_PhoneNumber: '5718546323',
  entityPhoneNumber: '7034846574',
  createdAt: 'Thu Oct 03 2019 20:43:12 GMT-0700 (Pacific Daylight Time) {}',
  street: '141 First Second Street',
  city: 'Fairfax',
  state: 'VA',
  zip: 22030,
  contracts: ['5d96b7314f8bb6b2cab024b5'],
};
const incorrectEntry = {
  password: 'vallygurl13',
  entityName: 'Anderson Valley Group',
};
module.exports = [correctEntry, incorrectEntry];

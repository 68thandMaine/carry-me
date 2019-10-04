const correctEntry = {
  _id: '5d96cc3750ffe5bac5346dfd',
  entityName: 'Anderson Valley Group',
  email: 'andersoncorp@gmail.com',
  password: 'vallygurl13',
  accountOwner_FirstName: 'Fred',
  accountOwner_LastName: 'Ackerson',
  accountOwner_PhoneType: 'Cell',
  accountOwner_PhoneNumber: '5718546323',
  entityPhoneNumber: '7034846574',
  createdAt: 'Thu Oct 03 2019 20:43:12 GMT-0700 (Pacific Daylight Time)',
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
const entry1 = {
  _id: '5d96cc3750ffe5bac5346dfd',
  entityName: 'Jackson Maxson Laxin',
  email: 'jsLaxin@gmail.com',
  password: 'storetourl13',
  accountOwner_FirstName: 'Jed',
  accountOwner_LastName: 'Tech',
  accountOwner_PhoneType: 'Home',
  accountOwner_PhoneNumber: '5532198543',
  entityPhoneNumber: '5036548652',
  createdAt: 'Mon Jan 03 2013 20:43:12 GMT-0700 (Pacific Daylight Time)',
  street: '13 Third Sixth Street',
  city: 'Fairfax',
  state: 'VA',
  zip: 22030,
  contracts: ['5d96b7314f8bb6b2cab024b5'],
};
module.exports = [correctEntry, incorrectEntry];

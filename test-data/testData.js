module.exports = {
  users: {
    standard: {
      username: process.env.SAUCEDEMO_USERNAME,
      password: process.env.SAUCEDEMO_PASSWORD
    },
    invalid: {
      username: 'invalid_user',
      password: 'invalid_password'
    }
  },
  products: {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light'
  },
  checkout: {
    firstName: 'Taylor',
    lastName: 'Tester',
    postalCode: '10001'
  },
  messages: {
    invalidCredentials:
      'Username and password do not match any user in this service',
    orderComplete: 'Thank you for your order!'
  }
};

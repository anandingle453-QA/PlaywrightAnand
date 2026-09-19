module.exports = {
  default: {
    require: ['step-definations/*.ts'],
    requireModule: ['ts-node/register'],
   format: [
      'progress',
      'allure-cucumberjs/reporter'
    ]
  }
};
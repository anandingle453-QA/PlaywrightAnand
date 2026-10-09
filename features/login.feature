Feature: SauceDemo authentication

  @smoke @regression
  Scenario: Successful login
    Given the user is on the SauceDemo login page
    When the user logs in with valid credentials
    Then the user should be on the products page

  @regression
  Scenario: Invalid login is rejected
    Given the user is on the SauceDemo login page
    When the user logs in with invalid credentials
    Then the login error should explain the credentials are invalid

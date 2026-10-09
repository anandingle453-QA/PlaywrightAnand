Feature: Shopping cart

  @smoke @regression
  Scenario: Add a product to the cart
    Given the user is logged in with valid credentials
    When the user adds the backpack to the cart
    Then the cart badge should show 1 item

  @smoke @regression
  Scenario: Verify selected products in the cart
    Given the user is logged in with valid credentials
    When the user adds the backpack and bike light to the cart
    And the user opens the cart
    Then the cart should contain the backpack and bike light

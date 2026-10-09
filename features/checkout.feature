Feature: Checkout and order completion

  @regression
  Scenario: Review customer and product details before ordering
    Given the user is logged in with valid credentials
    When the user adds the backpack and bike light to the cart
    And the user opens the cart
    And the user starts checkout
    And the user enters the checkout details
    Then the order overview should include the backpack and bike light

  @smoke @regression
  Scenario: Complete an order successfully
    Given the user is logged in with valid credentials
    When the user adds the backpack and bike light to the cart
    And the user opens the cart
    And the user starts checkout
    And the user enters the checkout details
    And the user finishes the order
    Then the order completion message should be displayed

Feature: Browse and select products

  @regression
  Scenario: Find products in the inventory
    Given the user is logged in with valid credentials
    Then the products list should include the backpack and bike light

  @regression
  Scenario: Select a product to view its details
    Given the user is logged in with valid credentials
    When the user opens the backpack details
    Then the selected product should be the backpack

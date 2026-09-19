Feature: Add products to cart

  Scenario: Successfully add two products to the cart
    Given user is on login page
    When user enters username "standard_user"
    And user enters password "secret_sauce"
    And user clicks login button
    And user adds product "Sauce Labs Backpack" to the cart
    And user adds product "Sauce Labs Bike Light" to the cart
    And user opens the cart
    Then the cart should contain products "Sauce Labs Backpack" and "Sauce Labs Bike Light"
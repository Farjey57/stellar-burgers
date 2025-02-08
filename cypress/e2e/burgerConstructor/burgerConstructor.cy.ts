import { SELECTORS, INGREDIENTS, TEXT } from 'cypress/support/constants';

describe('добавление ингредиента из списка в конструктор', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as(
      'fetchIngredients'
    );
    cy.visit('');
    cy.wait('@fetchIngredients');
  });

  //добавление булки
  it('Добавление булки в конструктор в оба поля (верх и низ)', function () {
    cy.get(SELECTORS.CONSTRUCTOR_BUN)
      .as('bunConstructor')
      .should('have.length', 2) // проверяем, что количество элементов равно 2
      .each(($el) => {
        // перебираем каждый элемент и проверяем его текст
        cy.wrap($el).should('have.text', TEXT.CHOOSE_BUN);
      });

    cy.clickElement(SELECTORS.BUN_INGREDIENT, TEXT.ADD);

    cy.get('@bunConstructor')
      .should('have.length', 2)
      .each(($el) => {
        cy.wrap($el).contains(INGREDIENTS.BUN).should('exist');
      });
  });

  //добавление начинки
  it('Добавление начинки и соуса в конструктор', function () {
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT)
      .as('ingredientConctructor')
      .each(($el) => {
        cy.wrap($el).should('have.text', TEXT.CHOOSE_INGREDIENT);
      });

    cy.clickElement(SELECTORS.INGREDIENT, TEXT.ADD);

    cy.get('@ingredientConctructor')
      .contains(INGREDIENTS.INGREDIENT)
      .should('exist');

    cy.clickElement(SELECTORS.SAUCE, TEXT.ADD);

    cy.get('@ingredientConctructor')
      .contains(INGREDIENTS.SAUCE)
      .should('exist');
  });
});

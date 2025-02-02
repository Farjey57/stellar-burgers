import { SELECTORS, INGREDIENTS, TEXT } from 'cypress/support/constants';

describe('добавление ингредиента из списка в конструктор', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as(
      'fetchIngredients'
    );
    cy.visit('http://localhost:4000');
    cy.wait('@fetchIngredients');
  });

  //добавление булки
  it('Добавление булки в конструктор в оба поля (верх и низ)', function () {
    cy.get(SELECTORS.CONSTRUCTOR_BUN)
      .should('have.length', 2) // проверяем, что количество элементов равно 2
      .each(($el) => {
        // перебираем каждый элемент и проверяем его текст
        cy.wrap($el).should('have.text', TEXT.CHOOSE_BUN);
      });

    cy.get(SELECTORS.BUN_INGREDIENT).contains(TEXT.ADD).click();

    cy.get(SELECTORS.CONSTRUCTOR_BUN)
      .should('have.length', 2)
      .each(($el) => {
        cy.wrap($el).contains(INGREDIENTS.BUN).should('exist');
      });
  });

  //добавление начинки
  it('Добавление начинки и соуса в конструктор', function () {
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT).each(($el) => {
      cy.wrap($el).should('have.text', TEXT.CHOOSE_INGREDIENT);
    });

    cy.get(SELECTORS.INGREDIENT).contains(TEXT.ADD).click();

    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT)
      .contains(INGREDIENTS.INGREDIENT)
      .should('exist');

    cy.get(SELECTORS.SAUCE).contains(TEXT.ADD).click();

    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT)
      .contains(INGREDIENTS.SAUCE)
      .should('exist');
  });
});

import { SELECTORS, INGREDIENTS } from 'cypress/support/constants';

describe('добавление ингредиента из списка в конструктор', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as(
      'fetchIngredients'
    );
    cy.visit('');
    cy.wait('@fetchIngredients');
  });

  it('открытие модального окна ингредиента', function () {
    cy.get(SELECTORS.MODAL).should('not.exist');
    cy.clickElement(SELECTORS.BUN_INGREDIENT, INGREDIENTS.BUN);
    cy.get(SELECTORS.MODAL)
      .should('exist')
      .contains(INGREDIENTS.BUN)
      .should('exist');
  });

  it('закрытие модального окна по кнопке (крестику)', function () {
    cy.clickElement(SELECTORS.BUN_INGREDIENT, INGREDIENTS.BUN);
    cy.get(SELECTORS.MODAL_CLOSE).should('exist').click();
    cy.get(SELECTORS.MODAL).should('not.exist');
  });

  it('закрытие модального окна по оверлею', function () {
    cy.clickElement(SELECTORS.BUN_INGREDIENT, INGREDIENTS.BUN);
    cy.get('body').click(0, 0);
    cy.get(SELECTORS.MODAL).should('not.exist');
  });

  it('закрытие модального окна по нажатию Esc', function () {
    cy.clickElement(SELECTORS.BUN_INGREDIENT, INGREDIENTS.BUN);
    cy.get('body').type('{esc}');
    cy.get(SELECTORS.MODAL).should('not.exist');
  });
});

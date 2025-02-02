import { SELECTORS, TEXT } from 'cypress/support/constants';

describe('добавление ингредиента из списка в конструктор', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as(
      'fetchIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'userData.json' }).as(
      'userData'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'successOrder.json' }).as(
      'successOrder'
    );

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('testRefreshToken')
    );
    cy.setCookie('accessToken', 'testAccessToken');

    cy.visit('http://localhost:4000');
    cy.wait(['@fetchIngredients', '@userData']);
  });

  it('Create sucess order test', function () {
    cy.get(SELECTORS.BUN_INGREDIENT).contains(TEXT.ADD).click();
    cy.get(SELECTORS.INGREDIENT).contains(TEXT.ADD).click();

    cy.get(SELECTORS.ORDER_POST).contains(TEXT.POST).should('exist').click();

    cy.get(SELECTORS.MODAL)
      .should('exist')
      .contains(TEXT.NUMBER_ORDER)
      .should('exist');

    cy.get(SELECTORS.MODAL_CLOSE).should('exist').click();
    cy.get(SELECTORS.MODAL).should('not.exist');

    cy.get(SELECTORS.CONSTRUCTOR_BUN)
      .should('have.length', 2)
      .each(($el) => {
        cy.wrap($el).should('have.text', TEXT.CHOOSE_BUN);
      });
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT).each(($el) => {
      cy.wrap($el).should('have.text', TEXT.CHOOSE_INGREDIENT);
    });
  });

  afterEach(function () {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});

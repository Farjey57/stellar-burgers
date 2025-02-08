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

    cy.visit('');
    cy.wait(['@fetchIngredients', '@userData']);
  });

  it('Create sucess order test', function () {
    cy.clickElement(SELECTORS.BUN_INGREDIENT, TEXT.ADD);
    cy.clickElement(SELECTORS.INGREDIENT, TEXT.ADD);

    cy.get(SELECTORS.ORDER_POST).contains(TEXT.POST).should('exist').click();

    cy.wait('@successOrder').then((interception) => {
      // Проверяем статус ответа
      expect(interception.response?.statusCode).to.eq(200);

      // Проверяем данные в ответе
      const responseBody = interception.response?.body;
      expect(responseBody).to.have.property('success', true);
      expect(responseBody).to.have.property('name');
      expect(responseBody).to.have.property('order');
      expect(responseBody.order).to.have.property('number');
      expect(responseBody.order.number).to.eql(TEXT.NUMBER_ORDER);
    });

    cy.get(SELECTORS.MODAL)
      .as('modal')
      .should('exist')
      .contains(TEXT.NUMBER_ORDER)
      .should('exist');

    cy.get(SELECTORS.MODAL_CLOSE).should('exist').click();
    cy.get('@modal').should('not.exist');

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

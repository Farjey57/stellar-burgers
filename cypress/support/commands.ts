/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
/**
 * Кликает на элемент, который соответствует указанному селектору и содержит указанный текст.
 * @param {string} selector - Селектор элемента (например, `button`, `.class`, `#id`).
 * @param {string} label - Текст, который должен содержать элемент.
 * @example
 * cy.clickElement('button', 'Submit'); // Кликнет на кнопку с текстом "Submit"
 */
Cypress.Commands.add('clickElement', (selector, label) => {
  cy.get(selector).contains(label).click();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
declare namespace Cypress {
  interface Chainable {
    /**
     * Кликает на элемент, который соответствует указанному селектору и содержит указанный текст.
     * @param {string} selector - Селектор элемента (например, `button`, `.class`, `#id`).
     * @param {string} label - Текст, который должен содержать элемент.
     * @example
     * cy.clickElement('button', 'Submit'); // Кликнет на кнопку с текстом "Submit"
     */
    clickElement(selector: string, label: string): Chainable<void>;
    //       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    //       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    //       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
  }
}
// }

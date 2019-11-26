context('Hero Page Integration Tests', () => {
  beforeEach(() => {
    cy.visit('./');
  });
  describe('views on page', () => {
    it('Appropriate forms are visible on page', () => {
      cy.get('[data-cy="loginForm"]')
        .should('be.visible');
      cy.get('[data-cy="signupForm"]')
        .should('be.visible');
    });
  });

  describe('signup form behavior', () => {
    it.only('Clicking the toggler changes the account type.', () => {
      cy.get('[data-cy="accountTypeLabel"]')
        .should('contain', 'Driver');
      cy.get('[data-cy="account_toggler"]')
        .click();
      cy.get('[data-cy="accountTypeLabel"]')
      .should('contain', 'Owner');
    });
  });
});
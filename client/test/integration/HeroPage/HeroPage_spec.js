context('Hero Page Integration Tests', () => {
  beforeEach(() => {
    cy.visit('./');
  })
  describe('views on page', () => {
    it('Appropriate forms are visible on page', () => {
      cy.get('[data-cy="loginForm"]')
        .should('be.visible');
    });
  });
});
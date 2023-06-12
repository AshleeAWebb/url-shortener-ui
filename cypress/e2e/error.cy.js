describe('Error Handling', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 500,
      body: { error: 'Server is down' },
    }).as('getUrlsRequest');
    cy.visit('http://localhost:3000/');
  });

  it('displays a message when there are no URLs yet', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', { urls: [] }).as('getUrlsRequest');
    cy.visit('http://localhost:3000/');
    cy.wait('@getUrlsRequest');
    cy.contains('No urls yet! Find some to shorten!').should('be.visible');
  });
});
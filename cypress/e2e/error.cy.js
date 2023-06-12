describe('Error Handling', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 500,
      body: { error: 'Server is down' },
    });
    cy.visit('http://localhost:3000/');
  });

  it('displays an error message when the server is down', () => {
    cy.contains('Server is down').should('be.visible');
  });
});
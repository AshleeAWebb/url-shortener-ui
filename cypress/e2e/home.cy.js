describe('Url Home Page', () => {
  beforeEach(() => {
    cy.fixture('url.json').as('urls');
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', { fixture: 'url.json' }).as('getUrls');
    cy.intercept('DELETE', 'http://localhost:3001/api/v1/urls/*', { statusCode: 204 }).as('deleteUrl');
    cy.visit('http://localhost:3000/');
    cy.wait('@getUrls');
  });

  it('should have a page title', () => {
    cy.title().should('eq', 'URL Shortener');
  });

  it('should have existing URLs on the home page', () => {
    cy.get('.url').should('have.length', 3);

    cy.get('.url').first().within(() => {
      cy.get('h3').should('contain', 'Awesome photo');
      cy.get('a').should('have.attr', 'href', 'http://localhost:3001/useshorturl/1');
      cy.get('a').should('contain', 'http://localhost:3001/useshorturl/1');
      cy.get('p').should('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80');
    });

    cy.get('.url').last().within(() => {
      cy.get('h3').should('contain', 'Wicked photo');
      cy.get('a').should('have.attr', 'href', 'http://localhost:3001/useshorturl/3');
      cy.get('a').should('contain', 'http://localhost:3001/useshorturl/3');
      cy.get('p').should('contain', 'https://images.pexels.com/photos/35888/amazing-beautiful-breathtaking-clouds.jpg?auto=compress&cs=tinysrgb&w=1600');
    });
  });

  it('should delete a URL', () => {
    cy.get('.url').first().within(() => {
      cy.contains('Delete').click();
    });
    cy.get('.url').should('have.length', 2);
  });
});

describe('Url From', () => {
  beforeEach(() => {
    cy.fixture('url.json').as('urls');
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', { fixture: 'url.json' });
    cy.visit('http://localhost:3000/');
  });

  it('should have a form', () => {
    cy.get('form').should('exist');
  });

  it('should have a form with proper inputs', () => {
    cy.get('form').should('exist');

    cy.get('input[name="title"]').should('exist');
    cy.get('input[name="title"]').should('have.attr', 'type', 'text');
    cy.get('input[name="title"]').should('have.attr', 'placeholder', 'Title...');
    cy.get('input[name="title"]').should('have.value', '');

    cy.get('input[name="urlToShorten"]').should('exist');
    cy.get('input[name="urlToShorten"]').should('have.attr', 'type', 'text');
    cy.get('input[name="urlToShorten"]').should('have.attr', 'placeholder', 'URL to Shorten...');
    cy.get('input[name="urlToShorten"]').should('have.value', '');
  
    cy.get('button').should('exist');
    cy.get('button').should('contain', 'Shorten Please!');
  });

  it('should reflect proper inputs when user fills out form', () => {
    cy.get('form').within(() => {
      cy.get('input[name="title"]').type('Google Title');
      cy.get('input[name="urlToShorten"]').type('https://www.google.com');
    });

    cy.get('input[name="title"]').should('have.value', 'Google Title');
    cy.get('input[name="urlToShorten"]').should('have.value', 'https://www.google.com');
  });
});
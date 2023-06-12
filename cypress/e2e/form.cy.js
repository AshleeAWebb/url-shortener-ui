describe('Url From', () => {
  beforeEach(() => {
    cy.fixture('url.json').as('urls');
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', 
    { fixture: 'url.json' }).as('getRequest');
    cy.visit('http://localhost:3000/');

    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      body: {
        "id": 4,
        "title": "Test photo",
        "long_url": "https://images.pexels.com/photos/35888/amazing-beautiful-breathtaking-clouds.jpg?auto=compress&cs=tinysrgb&w=1600",
        "short_url": "http://localhost:3001/useshorturl/4"
      },
    }).as('postRequest');
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

    cy.get('input[name="long_url"]').should('exist');
    cy.get('input[name="long_url"]').should('have.attr', 'type', 'text');
    cy.get('input[name="long_url"]').should('have.attr', 'placeholder', 'URL to Shorten...');
    cy.get('input[name="long_url"]').should('have.value', '');
  
    cy.get('button').should('exist');
    cy.get('button').should('contain', 'Shorten Please!');
  });

  it('should reflect proper inputs when user fills out form', () => {
    cy.get('form').within(() => {
      cy.get('input[name="title"]').type('Google Title');
      cy.get('input[name="long_url"]').type('https://www.google.com');
    });

    cy.get('input[name="title"]').should('have.value', 'Google Title');
    cy.get('input[name="long_url"]').should('have.value', 'https://www.google.com');
  });

  it('should submit the form successfully', () => {
    cy.get('input[name="title"]').type('Test photo');
    cy.get('input[name="long_url"]').type('https://images.pexels.com/photos/35888/amazing-beautiful-breathtaking-clouds.jpg?auto=compress&cs=tinysrgb&w=1600');
    cy.get('button').click();
  
    cy.wait('@postRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property('id', 4);
    });
  
    cy.get('h3')
      .contains('Test photo')
      .should('be.visible');
    cy.get('a')
      .contains('http://localhost:3001/useshorturl/4')
      .should('be.visible');
    cy.get('p')
      .contains('https://images.pexels.com/photos/35888/amazing-beautiful-breathtaking-clouds.jpg?auto=compress&cs=tinysrgb&w=1600')
      .should('be.visible');
  });
  });

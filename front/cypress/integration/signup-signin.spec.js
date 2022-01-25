describe('Signup', () => {
  it('creates a new account', () => {
    cy.visit('/');
    cy.contains('S\'inscrire').click();
    cy.url().should('include', '/inscription');
    cy.get('input[name="lastname"]').type('Cypress');
    cy.get('input[name="firstname"]').type('Test');
    cy.get('input[name="email"]').type('test@cypress').blur();
    cy.get('.form__error').should('contain', 'Ce champ doit contenir un email valide.');
    cy.get('input[name="email"]').clear().type('test@cypress.com');
    cy.get('input[name="password"]').type('test').blur();
    cy.get('.form__error').should('contain', 'Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et un caractère spécial.');
    cy.get('input[name="password"]').clear().type('Motdepasse123!');
    cy.get('input[name="confirmedPassword"]').type('Motdepasse123').blur();
    cy.get('.form__error').should('contain', 'Les mots de passe doivent être identiques.');
    cy.get('input[name="confirmedPassword"]').clear().type('Motdepasse123!');
    cy.get('input[name="acceptedTerms"]').click();
    cy.get('input[name="acceptedEmailDiff"]').click();
    cy.get('button[type="submit"]').click();
  });
  it('connects to the account', () => {
    cy.url().should('include', '/connexion');
    cy.get('input[name="email"]').type('test@cypress.co');
    cy.get('input[name="password"]').type('test');
    cy.get('button[type="submit"]').click();
    cy.get('.connect__error').should('contain', 'Cet utilisateur n\'existe pas.');
    cy.get('input[name="email"]').clear().type('test@cypress.com');
    cy.get('button[type="submit"]').click();
    cy.get('.connect__error').should('contain', 'Mauvais mot de passe');
    cy.get('input[name="password"]').clear().type('Motdepasse123!');
    cy.get('button[type="submit"]').click();
  });
  it('deletes the account', () => {
    cy.contains('Mon profil').click();
    cy.url().should('include', '/profil');
    cy.contains('Supprimer mon profil').click();
    cy.get('.modal__button').contains('Supprimer').click();
  });
});

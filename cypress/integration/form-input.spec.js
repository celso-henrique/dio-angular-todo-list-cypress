describe('Form input', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Focuses the input on load', () => {
    cy.focused().should('have.class', 'new-todo');
  });

  it.only('Accepts input', () => {
    const value = 'New todo';

    cy.get('.new-todo')
      .type(value)
      .should('have.value', value);
  });
});

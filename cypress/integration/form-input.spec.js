describe('Form input', () => {
  beforeEach(() => {
    cy.seedAndVisit([]);
  });

  it('Focuses the input on load', () => {
    cy.focused().should('have.class', 'new-todo');
  });

  it('Accepts input', () => {
    const value = 'New todo';

    cy.get('.new-todo')
      .type(value)
      .should('have.value', value);
  });
});

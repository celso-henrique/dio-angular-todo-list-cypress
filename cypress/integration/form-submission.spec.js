describe('Form input', () => {
  it('Adds a new todo item', () => {
    const newTodo = 'Buy pizza';

    cy.server();
    cy.route({
      method: 'POST',
      url: '/ToDoModels',
      response: { id: 123, title: newTodo, completed: false }
    }).as('save');

    cy.seedAndVisit();

    cy.fixture('todos').then(todos => {
      cy.route({
        method: 'GET',
        url: '/ToDoModels',
        response: [...todos, { id: 123, title: newTodo, completed: false }]
      }).as('second-load');
    });

    cy.get('.new-todo')
      .type(newTodo)
      .type('{enter}');

    cy.wait('@save');
    cy.wait('@second-load');

    cy.get('.task-wrapper').should('have.length', 5);
  });
});

const todo1 = {
  id: 'ID-1',
  title: 'Első todo',
  description: 'Első todo leírása',
  deadline: new Date('2021-07-28'),
  isCompleted: true,
};

const todo2 = {
  id: 'ID-2',
  title: 'Második todo',
  description: 'Második todo leírása',
  deadline: new Date('2020-04-01'),
  isCompleted: false,
};

const leftPad = (input: string) => {
  while (input.length < 2) {
    input = '0' + input;
  }
  return input;
};

const year = (date: Date) => {
  return date.getFullYear();
};

const month = (date: Date) => {
  return leftPad((date.getMonth() + 1).toString());
};

const day = (date: Date) => {
  return leftPad(date.getDate().toString());
};

const dateToFormFormat = (date: Date) => {
  return `${month(date)}/${day(date)}/${year(date)}`;
};

const dateToTableFormat = (date: Date) => {
  return `${year(date)}-${month(date)}-${day(date)}`;
};

const fillForm = (todo: any) => {
  cy.get('[data-test="todo-dialog"]').within(() => {
    cy.get('[data-test="todo-title"]').click().type(todo.title);
    cy.get('[data-test="todo-description"]').click().type(todo.description);
    cy.get('[data-test="todo-deadline"]')
      .click()
      .type(dateToFormFormat(todo.deadline));
    if (todo.isCompleted) {
      cy.get('[data-test="todo-is-completed"] input').check({ force: true });
    } else {
      cy.get('[data-test="todo-is-completed"] input').uncheck({
        force: true,
      });
    }
  });
};

const checkRow = (todo: any) => {
  if (todo.isCompleted) {
    cy.get('[data-test="todo-is-completed"] input').should('be.checked');
  } else {
    cy.get('[data-test="todo-is-completed"] input').should('not.be.checked');
  }
  cy.get('[data-test="todo-title"]').should('contain', todo.title);
  cy.get('[data-test="todo-description"]').should('contain', todo.description);
  cy.get('[data-test="todo-deadline"]').should(
    'contain',
    dateToTableFormat(todo.deadline)
  );
};

describe('Cypress demo', () => {
  beforeEach(() => {
    cy.request('DELETE', 'http://localhost:5000/todo');
    cy.intercept('GET', 'http://localhost:5000/todo').as('getAll');
    cy.intercept('POST', 'http://localhost:5000/todo').as('post');
    cy.visit('/');
  });
  it('Test', () => {
    cy.get('[data-test="todo-create"]').click();
    fillForm(todo1);
    cy.get('[data-test="todo-submit"]').click();
    cy.wait('@post');
    cy.wait('@getAll');

    cy.get('[data-test="todo-create"]').click();
    fillForm(todo2);
    cy.get('[data-test="todo-submit"]').click();
    cy.wait('@post');
    cy.wait('@getAll');

    cy.get('[data-test="todo-row"]')
      .first()
      .within(() => {
        checkRow(todo1);
      });

    cy.get('[data-test="todo-row"]')
      .should('have.length', 2)
      .eq(1)
      .within(() => {
        checkRow(todo2);
      });
  });

  it('Intercept', () => {
    cy.intercept('GET', 'http://localhost:5000/todo', {
      forceNetworkError: true,
    }).as('getAll');
    cy.visit('/');
    cy.wait('@getAll');
    cy.get('[data-test="todo-error"]').should('exist');
    cy.get('[data-test="todo-table"]').should('not.exist');
  });
});

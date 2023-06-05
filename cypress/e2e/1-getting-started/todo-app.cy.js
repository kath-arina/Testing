/// <reference types="cypress" />

describe("todo-app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    const newTodo = "learn Testing";
    const newTodo2 = "clean house";

    cy.get("[data-cy=input]").type(`${newTodo}`);
    cy.get("[data-cy=submit-Btn]").click();
    cy.get("[data-cy=input]").type(`${newTodo2}`);
    cy.get("[data-cy=submit-Btn]").click();

    //Input new ToDo

    cy.get("[data-cy=todo-list] li")
      .should("have.length", 2)
      .first()
      .should("have.text", newTodo);
  });

  //Filter
  it("tests Filters Todos", () => {
    cy.contains("clean house").find("input[type=checkbox]").check();

    cy.get("[data-cy=all]").check();
    cy.get("[data-cy=todo-list] li").should("have.length", 2);

    cy.get("[data-cy=done]").check();
    cy.get("[data-cy=todo-list] li:visible").should("have.length", 1);

    cy.get("[data-cy=open]").check();
    cy.get("[data-cy=todo-list] li:visible").should("have.length", 1);
  });
  // Delete Done Todos
  it("tests delete btn", () => {
    cy.contains("clean house").find("input[type=checkbox]").check();
    cy.get("[data-cy=delete_btn]").click();
    cy.get("[data-cy=todo-list] li").should("have.length", 1);
  });

  // Duplicate check
  it("checks duplicates", () => {
    const newTodo3 = "stop learning";
    const newTodo4 = "clean house";

    cy.get("[data-cy=input]").type(`${newTodo3}`);
    cy.get("[data-cy=submit-Btn]").click();

    cy.get("[data-cy=input]").type(`${newTodo4}`);
    cy.get("[data-cy=submit-Btn]").click();

    cy.get("[data-cy=todo-list] li").should("have.length", 3);
  });
});

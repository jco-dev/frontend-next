describe("Books", () => {
  it("can list, show, create, edit and delete books", () => {
    // Listado de Libros
    cy.visit("/").get("[data-cy=link-to-books]").click();

    // Crear libro
    cy.get('[href="/libros/crear"]')
      .click()
      .get("[data-cy=input-book-title]")
      .type("Nuevo libro desde Cypress")
      .get("[data-cy=button-submit-book]")
      .click()
      .get("[data-cy=book-list]")
      .contains("Nuevo libro desde Cypress");

    // Ver un libro
    cy.get("[data-cy^=link-to-visit-book-]")
      .last()
      .click()
      .get("h1")
      .should("contain.text", "Nuevo libro desde Cypress")
      .get('[href="/libros"]')
      .click();

      // Editar un Libro
      cy.get("[data-cy^=link-to-edit-book-]")
      .last()
      .click()
      .get("[data-cy=input-book-title]")
      .clear()
      .type("Libro editado desde Cypress")
      .get("[data-cy=button-submit-book]")
      .click()
      .get("[data-cy=book-list]")
      .contains("Libro editado desde Cypress");

      // Eliminar Libro
      cy.get("[data-cy^=link-to-delete-book-]")
      .last()
      .click()
      .get("[data-cy^=link-to-visit-book-]")
      .last()
      .should('not.contain.html', '<h1>Libro editado desde Cypress</h1>');

  });
});

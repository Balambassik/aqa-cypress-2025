describe("Garage and Expenses", () => {
    beforeEach(() => {
        cy.visit('/')

        cy.contains('Sign In').click()
        cy.get('#signinEmail').type(Cypress.env('username'))
        cy.get('#signinPassword').type(Cypress.env('password'), { sensitive: true })
        cy.contains('Login').click()
    })

    it('Add car and expenses fuel', () => {
        cy.get('app-garage div.panel-page_heading button.btn.btn-primary').click()
        cy.get('#addCarMileage').type('1000')
        cy.get('ngb-modal-window button.btn-primary').click()

        cy.contains('nav a', 'Fuel expenses').click();

        cy.contains('app-fuel-expenses button', 'Add').click();
        cy.get('#addExpenseMileage')
            .clear()
            .type('1050')
        cy.get('#addExpenseLiters').type('50')
        cy.get('#addExpenseTotalCost').type('1000')
        cy.get('ngb-modal-window button.btn-primary').click()
    })
})
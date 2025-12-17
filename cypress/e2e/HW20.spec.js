import { faker } from "@faker-js/faker";


describe("Registration form", () => {
    beforeEach(() => {
        cy.visit("/")
        cy.contains('Sign up').click();
    })

    it('Все поля пустые', () => {
        cy.get('#signupName').focus().blur()
        cy.get('#signupLastName').focus().blur()
        cy.get('#signupEmail').focus().blur()
        cy.get('#signupPassword').focus().blur()
        cy.get('#signupRepeatPassword').focus().blur()

        cy.get('#signupName').parent().should('contain.text', 'Name required')
        cy.get('#signupLastName').parent().should('contain.text', 'Last name required')
        cy.get('#signupEmail').parent().should('contain.text', 'Email required')
        cy.get('#signupPassword').parent().should('contain.text', 'Password required')
        cy.get('#signupRepeatPassword').parent().should('contain.text', 'Re-enter password required')

        cy.get('#signupName').should('have.class', 'is-invalid')
        cy.get('#signupLastName').should('have.class', 'is-invalid')
        cy.get('#signupEmail').should('have.class', 'is-invalid')
        cy.get('#signupPassword').should('have.class', 'is-invalid')
        cy.get('#signupRepeatPassword').should('have.class', 'is-invalid')
    })

    it('Неверная длина Name и Last Name', () => {
        cy.get('#signupName').type('A').blur()
        cy.get('#signupLastName').type('A').blur()

        cy.get('#signupName')
            .parent()
            .should('contain.text', 'Name has to be from 2 to 20 characters long')
        cy.get('#signupLastName')
            .parent()
            .should('contain.text', 'Last name has to be from 2 to 20 characters long')
        
        cy.get("#signupName").should('have.class', 'is-invalid')
        cy.get("#signupLastName").should('have.class', 'is-invalid')
    })

    it("Неверные Name LastName Email (Wrong data)", () => {
        cy.get('#signupName').type('###').blur()
        cy.get('#signupLastName').type('###').blur()
        cy.get('#signupEmail').type('###').blur()

        cy.get('#signupName')
            .parent()
            .should('contain.text', 'Name is invalid')
        cy.get('#signupLastName')
            .parent()
            .should('contain.text', 'Last name is invalid')
        cy.get('#signupEmail')
            .parent()
            .should('contain.text', 'Email is incorrect')
        
        cy.get('#signupName').should('have.class', 'is-invalid')
        cy.get('#signupLastName').should('have.class', 'is-invalid')
        cy.get('#signupEmail').should('have.class', 'is-invalid')
    })
    
    it('Неверный пароль', () => {
        cy.get('#signupPassword').type('Aa1', { sensitive: true}).blur()
        cy.get('#signupPassword')
            .parent()
            .should('contain.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        cy.get('#signupPassword').should('have.class', 'is-invalid')
    })

    it('Re-password неверный и не совпадает', () => {
        const validPassword = 'Quauto123'
        // Не совпадают
        cy.get('#signupPassword').type(validPassword, { sensitive: true })
        cy.get('#signupRepeatPassword').type('Quauto666', { sensitive: true }).blur()
        cy.get('#signupRepeatPassword')
            .parent()
            .should('contain.text', 'Passwords do not match')
        cy.get('#signupRepeatPassword').should('have.class', 'is-invalid')
        // Поле пустое
        cy.get('#signupRepeatPassword').clear().blur()
        cy.get('#signupRepeatPassword')
            .parent()
            .should('contain.text', 'Re-enter password required')
        cy.get('#signupRepeatPassword').should('have.class', 'is-invalid')
    })

    it('Успешная регистрация', () => {
        const validPassword = 'Qauto123'
        const email = faker.internet.email()

        cy.get('#signupName').type('Test')
        cy.get('#signupLastName').type('User')
        cy.get('#signupEmail').type(email)
        cy.get('#signupPassword').type(validPassword, { sensitive: true })
        cy.get('#signupRepeatPassword').type(validPassword, { sensitive: true })

        cy.contains('Register').click()
        cy.contains(' My profile ')

        cy.contains(' My profile ').click()
        cy.contains('Logout').click()
        cy.contains('Sign In').should('be.visible')

        cy.contains('Sign In').click()
        cy.login(email, validPassword)
        cy.contains(' My profile ').should('be.visible')
    })
})
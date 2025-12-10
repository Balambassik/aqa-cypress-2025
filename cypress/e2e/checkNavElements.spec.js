describe("Main page", () => {
    const expectedHeaderLinks = [
        "Home",
        "About",
        "Contacts",
        "Guest log in",
        "Sign In"
    ]
  beforeEach(() => {
    cy.visit("/");
  });

  it("All header button are visible", () => {
    cy.get('app-header').within(() => {
        cy.get('.header_inner.d-flex')
            .within(() => {
                expectedHeaderLinks.forEach(text => {
                    cy.contains(text).should('be.visible')
                })
            })
    });
  });
  it("All footers button are visible", () => {
    cy.get('.row .contacts_socials.socials').within(() => {
        cy.get('a[href*="https://www.facebook.com/Hillel.IT.School"]').should('be.visible')
        cy.get('a[href*="https://t.me/ithillel_kyiv"]').should('be.visible')
        cy.get('a[href*="https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"]').should('be.visible')
        cy.get('a[href*="https://www.instagram.com/hillel_itschool/"]').should('be.visible')
        cy.get('a[href*="https://www.linkedin.com/school/ithillel/"]').should('be.visible')
    })
    cy.get(
        '#contactsSection .col-md-6.d-flex.flex-column.align-items-center.align-items-md-end.justify-content-md-end.mb-2.mt-3.mt-md-0'
      ).within(() => {
        cy.contains('a', 'ithillel.ua')
          .should('be.visible')
          .and('have.attr', 'href', 'https://ithillel.ua');
        cy.contains('a', 'support@ithillel.ua')
          .should('be.visible')
          .and('have.attr', 'href', 'mailto:developer@ithillel.ua');
      });
    });
})
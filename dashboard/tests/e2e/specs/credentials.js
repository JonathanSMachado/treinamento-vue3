const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Credentials', () => {
  it('should generate a new apikey with click on generate button', () => {
    cy.visit(APP_URL)
    cy.get('#login-button').click()
    cy.contains('h1', 'Entre na sua conta')
    cy.get('#email-field').type('igor@igor.me')
    cy.get('#password-field').type('1234')
    cy.get('#submit-button').click()

    cy.wait(3000)
    cy.get('#menu-credentials-button').click()
    cy.wait(2000)

    const oldApikey = cy.get('#apikey-container').invoke('text')
    cy.get('#generate-apikey-button').click()
    cy.wait(2000)
    const newApikey = cy.get('#apikey-container').invoke('text')

    expect(oldApikey).to.not.equal(newApikey)
  })
})

// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Has a welcome message', () => {
    cy.visit('/')
    cy.contains( 'Welcome to Your Vue.js App')
  })
  it("contains 'Edyst' as a heading",()=>{
    cy.contains('h1','Edyst')
  })
})

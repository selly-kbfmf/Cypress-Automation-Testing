import config from '../e2e/config.json'
import { faker } from '@faker-js/faker'


const FIXTURE_LOGIN_VALID   = require('../fixtures/login_valid.json')
const FIXTURE_LOGIN_INVALID   = require('../fixtures/login_invalid.json')

describe('API Login Fixture  ', function () {
    
    it('Valid login - username, valid fixture data ', () => {
        cy.request({
            method: 'POST', 
            url: `${config.URL_API_LOGIN}`,
            failOnStatusCode: false,
            headers: { 'Content-Type' : `${config.CONTENT_TYPE}`, 'Authorization' : `${config.AUTHORIZATION}`},   
            body :  FIXTURE_LOGIN_VALID
        }).as('login')

        cy.get('@login').its('status').should('eq', 200)
        cy.get('@login').then((response) => {
            let result = response.body.data
            cy.log(JSON.stringify(result))
        })
    })
 
    
    it('InValid login - username, with invalid fixture data ', () => {
        cy.request({
            method: 'POST',
            url: `${config.URL_API_LOGIN}`,
            failOnStatusCode: false,
            headers: { 'Content-Type' : `${config.CONTENT_TYPE}`, 'Authorization' : `${config.AUTHORIZATION}`},   
            body :  FIXTURE_LOGIN_INVALID
        }).as('login')

        cy.get('@login').its('status').should('eq', 400)
        cy.get('@login').then((response) => {
            let result = response.body.data
            cy.log(JSON.stringify(result))
        })
    })
 
})

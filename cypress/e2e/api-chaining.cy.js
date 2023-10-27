import config from '../e2e/config.json'
import { faker } from '@faker-js/faker'


const FIXTURE_LOGIN_MERCHANT   = require('../fixtures/login_valid_merchant.json')

describe('API Chaining ', function(){
       
    it('Valid login - Chaining - Supplier Detail ',{ tags : 'wip' },  () => {
        //let result 
        cy.request({
            method: 'POST',
            url: `${config.URL_API_LOGIN}`,
            headers: { 'Content-Type' : `${config.CONTENT_TYPE}`, 'Authorization' : `${config.AUTHORIZATION}`},   
            body :  FIXTURE_LOGIN_MERCHANT
        }).as('login')
        cy.get('@login').its('status').should('eq', 200)
        cy.get('@login').then((response) => {
            let responseLogin = response.body.data
            responseLogin.BearerToken = "Bearer " + responseLogin.access_token

            cy.log(JSON.stringify(responseLogin))
            cy.log('Supplier ID : ' + responseLogin.supplier_id)
            cy.log('token : ' + responseLogin.access_token)
            cy.log('bearer : ' + responseLogin.BearerToken)

            
            
            cy.request({
                method: 'GET',
                url: config.URL_API_MERCHANT + "?supplier_id="+ responseLogin.supplier_id + "&month=1}",
                failOnStatusCode: false,
                headers: { 'Content-Type' : `${config.CONTENT_TYPE}`, 'Authorization' : responseLogin.BearerToken},   
            }).then((response) => {
                let responseChaining = response.body.data
                expect(response.status).to.eq(404)
            })
        })
    })

})
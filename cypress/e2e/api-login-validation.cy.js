import config from '../e2e/config.json'
import { faker } from '@faker-js/faker'


describe('API Login Validation ', function () {
    it('InValid login with username, empty request body ', () => {
        cy.request({
            method: 'POST',
            url: `${config.URL_API_LOGIN}`,
            failOnStatusCode: false,
            headers: { 'Content-Type' : `${config.CONTENT_TYPE}`, 'Authorization' : `${config.AUTHORIZATION}`},   
            body : {}
        }).as('login')

        cy.get('@login').its('status').should('eq', 400)
    })

    it('InValid login with username, invalid datatype for email, password, device_id ', () => {
        cy.request({
            method: 'POST',
            url: `${config.URL_API_LOGIN}`,
            failOnStatusCode: false,
            headers: { 'Content-Type' : `${config.CONTENT_TYPE}`, 'Authorization' : `${config.AUTHORIZATION}`},   
            body : {
                "email": 12345678,
                "password": 12345678,
                "device_id": 12345678
            }
        }).as('login')

        cy.get('@login').its('status').should('eq', 400)
    })
    
    it('InValid login with username, empty/null value for email, password, device_id ', () => {
        cy.request({
            method: 'POST',
            url: `${config.URL_API_LOGIN}`,
            failOnStatusCode: false,
            headers: { 'Content-Type' : `${config.CONTENT_TYPE}`, 'Authorization' : `${config.AUTHORIZATION}`},   
            body : {
                "email": '',
                "password": '',
                "device_id": ''
            }
        }).as('login')

        cy.get('@login').its('status').should('eq', 400)
    })


    it('InValid login with username, fake all fields ', () => {
        let fakeEmail = faker.internet.email()
        let fakePassword = faker.random.alpha(10) 
        let fakeDeviceId = faker.random.alpha(32) 

        cy.request({
            method: 'POST',
            url: `${config.URL_API_LOGIN}`,
            failOnStatusCode: false,
            headers: { 'Content-Type' : `${config.CONTENT_TYPE}`, 'Authorization' : `${config.AUTHORIZATION}`},   
            body : {
                "email": fakeEmail,
                "password": fakePassword,
                "device_id": fakeDeviceId
            }
        }).as('login')

        cy.get('@login').its('status').should('eq', 400)
    })
})

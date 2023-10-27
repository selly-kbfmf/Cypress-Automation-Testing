import config from '../e2e/config.json'
import { faker } from '@faker-js/faker'


describe('API Login ', function () {

    it('Valid login with username', () => {
        cy.request({
            method: 'POST',
            url: `${config.URL_API_LOGIN}`,
            failOnStatusCode: false,
            headers: { 'Content-Type' : `${config.CONTENT_TYPE}`, 'Authorization' : `${config.AUTHORIZATION}`},   
            body : {
                "email": "rizasputro@gmail.com",
                "password": "Rz!1111",
                "device_id":"83c6a42b7cb6314fa151489ffc1e48e6"
            }
        }).as('login')

        cy.get('@login').its('status').should('eq', 200)
        cy.get('@login').then((response) => {
            //cy.log(JSON.stringify(response.body))

            let result = response.body.data
            //cy.log(JSON.stringify(result))

            let email = result.email
            let name = result.name
            cy.log('email : ' + email )
            cy.log('name : ' + name  )
        })
    })

    it('Valid login with username, valid name, email n role', () => {
        cy.request({
            method: 'POST',
            url: `${config.URL_API_LOGIN}`,
            failOnStatusCode: false,
            headers: { 'Content-Type' : `${config.CONTENT_TYPE}`, 'Authorization' : `${config.AUTHORIZATION}`},   
            body : {
                "email": "rizasputro@gmail.com",
                "password": "Rz!1111",
                "device_id":"83c6a42b7cb6314fa151489ffc1e48e6"
            }
        }).as('login')

        //Validate status code
        cy.get('@login').its('status').should('eq', 200)
        cy.get('@login').then((response) => {
            let result = response.body.data
            //cy.log(JSON.stringify(result))

            let email = result.email
            let name = result.name
            cy.log('email : ' + email )
            cy.log('name : ' + name  )
            expect(result.email).equal('rizasputro@gmail.com')
            expect(result.name).equal('ADMIN')
            // expect(result.name).equal('Riza') expected FAILED
        })
    })


    it('Valid login with username, valid field/property supplier, empty supplier id', () => {
        cy.request({
            method: 'POST',
            url: `${config.URL_API_LOGIN}`,
            failOnStatusCode: false,
            headers: { 'Content-Type' : `${config.CONTENT_TYPE}`, 'Authorization' : `${config.AUTHORIZATION}`},   
            body : {
                "email": "rizasputro@gmail.com",
                "password": "Rz!1111",
                "device_id":"83c6a42b7cb6314fa151489ffc1e48e6"
            }
        }).as('login')

        //Validate status code
        cy.get('@login').its('status').should('eq', 200)
        cy.get('@login').then((response) => {
            let result = response.body.data
            //cy.log(JSON.stringify(result))

            cy.log('supplier id : ' + result.supplier_id )
            expect(result.supplier_id).equal('')
            expect(result).to.have.property('supplier_id')
        })
    })


})

//const thirdArray = ["third", 3, 4.7, true]
//thirdArray.forEach( element => console.log(element))
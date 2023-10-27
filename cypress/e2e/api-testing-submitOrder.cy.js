import config from './config.json'
import { faker } from '@faker-js/faker'

let access_token, prospect_id;

describe('API Testing', function () {

    it('Login Email', () => {
        cy.request({
            method: 'POST',
            url: `${config.URL_API_LOGIN}`,
            failOnStatusCode: false,
            headers: { 'Content-Type' : `${config.CONTENT_TYPE}`, 'Authorization' : `${config.AUTHORIZATION}`},   
            body : {
                "email": "sellyanatya18@gmail.com",
                "password": "Kpvendor1!",
                "device_id":""
            }
        }).as('login')

        cy.get('@login').its('status').should('eq', 200)
        cy.get('@login').then((response) => {
            //cy.log(JSON.stringify(response.body))

            let result = response.body.data
            //cy.log(JSON.stringify(result))

            access_token = result.access_token
            cy.log('access_token : ' + access_token )
        })
    })

    it('Generate PPID', () => {

        cy.log('access_token : ' + access_token )

        cy.request({
            method: 'POST',
            url: `${config.BASE_URL_DEV+config.V1+config.URL_API_GENERATE_PPID}`,
            failOnStatusCode: false,
            headers: { 'Content-Type' : `${config.CONTENT_TYPE}`, 'Authorization' : `${config.AUTHORIZATION_MERCHANT}`+ access_token},   
            body : {
                "branch_id": "426"
            }
        }).as('generate_ppid')

        cy.get('@generate_ppid').its('status').should('eq', 200)

        cy.get('@generate_ppid').then((response) => {
            //cy.log(JSON.stringify(response.body))

            let result = response.body.data
            //cy.log(JSON.stringify(result))

            prospect_id = result.prospect_id
            cy.log('prospect_id : ' + prospect_id )
        })
    })

    it('Create Submission Order', () => {

        cy.log('prospect_id : ' + prospect_id )

        cy.request({
            method: 'POST',
            url: `${config.BASE_URL_DEV+config.V1+config.URL_API_CREATE_ORDER}`,
            failOnStatusCode: false,
            headers: { 'Content-Type' : `${config.CONTENT_TYPE}`, 'Authorization' : `${config.AUTHORIZATION_MERCHANT}`+ access_token},   
            body : {
                "prospect_id": prospect_id,
                "branch_id": "426",
                "branch_name": "Jakarta",
                "product_id": "54a64fba-f866-4e3b-be6d-97fd878bf4c9",
                "insurance_type": "TLO",
                "customer_type_code": "C",
                "birth_date": "Z2R3qru1WHdKdU36kL8+H8J8KmizuyKpRuY=",
                "birth_place": "vL3WgC4+1iO6ZcsUaVMYDEZXnuz7RWrtrw/x",
                "customer_name": "Testing Cypress",
                "gender": "M",
                "id_number": "3376010804960001",
                "legal_name": "Testing Cypress Legal",
                "marital_status": "M",
                "mobile_phone": "qmy5SSzhei5dCzBW1nFqFX92hfxdQmgI25T7",
                "whatsapp_number": "X6xiO4m7zG8/IIki3QKOm6sIwQ0jyneEqxF22Q==",
                "email": "OUArVcNT3QP2b+zxuk8RwFXEM4RgeiN4UD+0zIL8FULJay2yuapP",
                "spouse_birth_date": "Z2R3qru1WHdKdU36kL8+H8J8KmizuyKpRuY=",
                "spouse_birth_place": "vL3WgC4+1iO6ZcsUaVMYDEZXnuz7RWrtrw/x",
                "spouse_gender": "F",
                "spouse_id_number": "PkL9QPJfZLJca+0B57DBB0SW9UagHuURjI+YQ7vbND0=",
                "spouse_legal_name": "Testing ,.'",
                "spouse_mobile_phone": "UZCIYlD+lcZwcMqLsGrYTRUPRxjMtX2aq1mIBJIT",
                "spouse_name": "Testing ,.' ",
                "spouse_surgate_mother_name": "vL3WgC4+1iO6ZcsUaVMYDEZXnuz7RWrtrw/x",
                "surgate_mother_name": "vL3WgC4+1iO6ZcsUaVMYDEZXnuz7RWrtrw/x",
                "photo_ktp_url": "https://dev-platform-media.kreditplus.com/media/reference/40000/DSY01410202212020005/ktp_DSY01410202212020005.jpg",
                "photo_stnk_url": "https://dev-platform-media.kreditplus.com/media/reference/40000/DSY01410202212020005/kk_DSY01410202212020005.jpg",
                "photo_spouse_ktp_url": "https://dev-platform-media.kreditplus.com/media/reference/40000/DSY01410202212020005/stnk_DSY01410202212020005.jpg",
                "tenor": 36,
                "tenor_in_year": 3,
                "tenor_year_tlo": 1,
                "asset": {
                    "asset_code": "Audi A4 1,8 AT",
                    "category_id": "SUV",
                    "brand": "AUDI",
                    "cylinder": "1231",
                    "frame_number": "123541263817231",
                    "machine_number": "123541263817231",
                    "year": 2021,
                    "plate_code": "B",
                    "color": "asdjfkl",
                    "police_no": "B 123 A"
                },
                "calculate": {
                    "market_price": 50000000.00,
                    "product_id": "KMOB2",
                    "product_offering_id": "MOBPKTCRSM",
                    "product_offering_description": "Pembiayaan Mobil Bekas - Digital Partnership",
                    "flat_rate_yearly": 8.75,
                    "flat_rate_monthly": 0.73,
                    "total_flat_rate": 17.5,
                    "effective_rate": 17.48,
                    "loan_amount": 222,
                    "admin_fee_type": "Non As Loan",
                    "admin_fee": 100,
                    "provision_fee_type": "As Loan",
                    "provision_fee": 111,
                    "ntf": 111,
                    "monthly_installment": 111,
                    "fiducia_fee": 111,
                    "life_insurance": 111,
                    "total_loan": 111,
                    "amount_of_interest": 111,
                    "basic_insurance": 111,
                    "earth_quake_insurance": 111,
                    "flood_insurance": 111,
                    "loading_rate": 1,
                    "authorized_dealer": 111,
                    "total_asset_insurance_before": 111,
                    "total_asset_insurance": 111,
                    "premi_asset_insurance": 111,
                    "down_payment": 111,
                    "amount_of_finance": 111,
                    "total_down_payment": 111,
                    "discount_refund_percent": 4,
                    "discount_refund_amount": 11,
                    "refund_rate_percent": 2.5,
                    "refund_rate_amount": 1,
                    "refund_provision_percent": 1,
                    "refund_provision_amount": 1,
                    "refund_insurance_percent": 4,
                    "refund_insurance_amount": 111,
                    "total_final_refund": 111,
                    "income_flat_rate": 111,
                    "income_insurance_asset": 111,
                    "total_income": 111,
                    "total_refund_before_tax": 111,
                    "total_loan_before_tax": 111
                }
            }
        }).as('create_order_uc')

        cy.get('@create_order_uc').its('status').should('eq', 200)
    })
})

//const thirdArray = ["third", 3, 4.7, true]
//thirdArray.forEach( element => console.log(element))
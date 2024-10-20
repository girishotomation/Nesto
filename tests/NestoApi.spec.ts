import { test, expect, request } from '@playwright/test';


test.describe('Nesto API Test', () => {
 //   for (let i = 0; i < 100; i++) {
        test('Account Creation API Test', async ({ request }) => {

            const formData = {
                "province": "ON",
                "firstName": "Girish",
                "lastName": "Gan",
                "email": generateRandomEmail(),
                "phone": "456-525-6686",
                "password": "Thisispass123$",
                "passwordConfirm": "Thisispass123$",
                "emailConsent": true,
                "leadDistributeConsentAgreement": true,
                "partnerAgreement": false,
                "region": "ON",
                "language": "en",
                "partialPostalCode": "",
                "passwordSpecified": true,
                "createdAt": "LOGIN",
                "gaClientId": "1989693931.1728570637",
                "anonymousAccountId": "NtQ6Uuy-niU-RaG_hyo6eIRZ8GieQkBTjXNG",
                "marketingChannel": "Organic Search",
                "utmSource": "google",
                "utmMedium": "organic",
                "utmCampaign": "(not set)",
                "utmTerm": "(not provided)",
                "impressionsTrackingId": null,
                "impressionsTrackingIdSpecified": false,
                "partner": "nesto",
                "subPartnerId": 0,
                "fbp": "fb.1.1728570636680.587887656936175508",
                "direct": false,
                "social": false
            }


            const response = await request.post('https://app.qa.nesto.ca/api/accounts', {
                data: formData
            });


            

            const responseBody = await response.json();
            console.log(responseBody)
            
            expect(response.status()).toBe(201);
            expect(responseBody.account.firstName).toBe(formData.firstName);
            expect(responseBody.account.lastName).toBe(formData.lastName);
            expect(responseBody.account.email).toBe(formData.email);
            expect(responseBody.account.phone).toBe(formData.phone);
        });
   // }
});



function generateRandomEmail(): string {
    const randomString = Math.random().toString(36).substring(2, 10);
    return 'girganAPItes' + randomString + '@email.com';
}

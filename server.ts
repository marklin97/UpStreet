// module 
const axios = require('axios');

// parameters attacthed with the post request
let config = {
    method: 'post',
    url: 'https://sandbox.ridx.io/international',
    headers: {
        "token": 'ba3c114b6fe336e9a558bb40b4cc2ca949d5c15eb6396fcaebdf3fa937045483',
        "Content-Type": "application/json"
    },
    data: {
        "countryCode": "AU",
        "address": {
            "addressLine1": "123 Fake Street",
            "locality": "Sydney",
            "postCode": "2000",
            "province": "NSW"
        },
        "identity": {
            "dob": "1965-01-01",
            "firstName": "John",
            "lastName": "Smith"
        }
    }
}
// Async function for sending the http post request
async function getResponse(config) {
    let verified;
    await axios(config).then(
        (res) => {
            // retrieve the verfication result as string
            let result = (res.data.codes.messages[res.data.codes.messages.length - 1].value)
            if (result == 'Full Match for 1+1 verification' || "Full Match for 2+2 verification") {
                verified = `'KYCresult: true'`
            } else {
                verified = `'KYCresult: false'`
            }
        },
        // output the errors if any
        (error) => { console.log(error) }
    );
    return verified;
}

// Calling the method
(async () => {
    console.log(await getResponse(config))
})()
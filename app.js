
require('dotenv').config();
const axios = require('axios')
const { mailChimpSubscriberPayload } = require('./utils/mailChimpUtils');
let response;

exports.lambdaHandler = async (event, context) => {
    try {
        const body = JSON.parse(event.body);
        const listId = process.env.LIST_ID || '';
        const userName = process.env.USER_NAME || '';
        const url = `https://us20.api.mailchimp.com/3.0/lists/${listId}/members`;
        const apiKey = process.env.API_KEY || '';
        console.log('API Key: ', apiKey);
        console.log('URL: ', url);
        console.log('List ID: ', listId);
        console.log('Username: ', userName);
        console.log('Email: ', body.email);
        const payload = mailChimpSubscriberPayload(body);

        const httpResponse = await axios({
            url,
            method: 'POST',
            data: JSON.stringify(payload),
            auth: {
                username: userName,
                password: apiKey
            }
        });

        response = {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS, POST",
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
            },
            'body': JSON.stringify({
                message: 'Thank you for joining us',
                data: { ...httpResponse.data }
            })
        }
    } catch (err) {
        console.log('Errors: ', err);
        return err;
    }

    return response
};

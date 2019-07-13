
require('dotenv').config();
const axios = require('axios')
const { mailChimpSubscriberPayload } = require('./utils/mailChimpUtils');
const log = console.log;
let response;

exports.lambdaHandler = async (event, context) => {
    try {
        const body = JSON.parse(event.body);
        const listId = process.env.LIST_ID || '';
        const userName = process.env.USER_NAME || '';
        const url = `https://us20.api.mailchimp.com/3.0/lists/${listId}/members`;
        const apiKey = process.env.API_KEY || '';
        log('API Key: ', apiKey);
        log('URL: ', url);
        log('List ID: ', listId);
        log('Username: ', userName);
        log('Email: ', body.email);
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
        log('Errors: ', err);
        response = {
            'statusCode': 500,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS, POST",
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
            },
            'body': JSON.stringify({
                message: err.message || 'Internal server error',
            })
        };
    }

    return response
};

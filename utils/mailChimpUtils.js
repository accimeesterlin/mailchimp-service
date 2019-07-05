const mailChimpSubscriberPayload = (body) => {
    const email = (body && body.email);
    const latitude = (body && body.latitude);
    const longitude = (body && body.longitude);
    const ipAddress = (body && body.ipAddress);

    const payload = {
        email_address: email,
        status: 'subscribed',
        tags: [
            'YouTube',
            'Videos',
            'Programming'
        ]
    };

    if (latitude && longitude) {
        payload.location.latitude = latitude;
        payload.location.longitude = longitude;
    }
    
    if (ipAddress) {
        payload.ip_signup = ipAddress;
    }

    console.log('Payload: ', payload);
    return payload;
};

module.exports = {
    mailChimpSubscriberPayload
}
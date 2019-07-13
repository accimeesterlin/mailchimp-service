const mailChimpSubscriberPayload = (body) => {
    const email = (body && body.email);
    const latitude = (body && body.latitude);
    const longitude = (body && body.longitude);
    const ipAddress = (body && body.ipAddress);
    const timezone = (body && body.timezone);

    const payload = {
        email_address: email,
        status: 'subscribed',
        tags: [
            'YouTube',
            'Videos',
            'Programming'
        ],
        location: {}
    };

    if (latitude && longitude) {
        payload.location.latitude = latitude;
        payload.location.longitude = longitude;
        payload.location.timezone = timezone;
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
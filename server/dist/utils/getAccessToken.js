export const getAccessToken = async () => {
    try {
        const auth = Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString('base64');
        const res = await fetch(`https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials`, {
            headers: { Authorization: `Basic ${auth}` }
        });
        const data = await res.json();
        return data.access_token;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};
//# sourceMappingURL=getAccessToken.js.map
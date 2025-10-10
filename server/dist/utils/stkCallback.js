import { getAccessToken } from "./getAccessToken.js";
export const stkPush = async (phone, amount, orderId) => {
    const token = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
    const password = Buffer.from(`${process.env.BusinessShortCode}${process.env.Passkey}${timestamp}`).toString('base64');
    const body = {
        BusinessShortCode: "174379",
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: "174379",
        PhoneNumber: phone,
        CallBackURL: `${process.env.SERVER_URL}/api/mpesa/callback`,
        AccountReference: orderId,
        TransactionDesc: `Payment for orderId:${orderId}`
    };
    const res = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const resData = await res.json();
    return resData;
};
//# sourceMappingURL=stkCallback.js.map
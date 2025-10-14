export const getAccessToken = async (): Promise<string> => {
  try {
    const auth = Buffer.from(
      `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
    ).toString("base64");

    const res = await fetch(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: { Authorization: `Basic ${auth}` },
      }
    );

    const data = await res.json();

    if (!res.ok || !data.access_token) {
      console.error("M-Pesa token error:", data);
      throw new Error(data.errorMessage || "Failed to obtain access token");
    }

    return data.access_token;
  } catch (err) {
    console.error("Access token generation failed:", err);
    throw err;
  }
};

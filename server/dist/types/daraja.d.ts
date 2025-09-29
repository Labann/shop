export interface CallbackMetadataItem {
    Name: string;
    Value: string | number;
}
export interface StkPushResponse {
    MerchantRequestID: string;
    CheckoutRequestID: string;
    ResponseCode: string;
    ResponseDescription: string;
    CustomerMessage: string;
}
export interface StkCallbackRequest {
    Body: {
        stkCallback: StkCallback;
    };
}
export interface StkCallback {
    MerchantRequestID: string;
    CheckoutRequestID: string;
    ResultCode: number;
    ResultDesc: string;
    CallbackMetadata?: {
        Item: CallbackMetadataItem[];
    };
}
//# sourceMappingURL=daraja.d.ts.map
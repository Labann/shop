// types/daraja.ts
export interface CallbackMetadataItem {
  Name: string;
  Value: string | number;
}

export interface StkPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;        // e.g., "0" means request accepted
  ResponseDescription: string; // e.g., "Success. Request accepted for processing"
  CustomerMessage: string;     // Message shown to the customer
  errorMessage?: string
}


export interface StkCallbackRequest {
  Body: {
    stkCallback: StkCallback;
  };
}

export interface StkCallback {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: number; // 0 = success, anything else = failure
  ResultDesc: string;
  CallbackMetadata?: {
    Item: CallbackMetadataItem[];
  };
}


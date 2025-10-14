import * as express from "express";
import { stkPush,  } from "../utils/stkCallback.js";
import {formatPhoneNumber} from "../utils/formmatNumber.js"

import type { Prisma} from "@prisma/client"
import prisma from "../utils/prisma.js";
import {type StkCallbackRequest } from "../types/daraja.js";
//payment controller


export const makePayment: express.RequestHandler = async (req, res) => {
    const {
        method, 
        orderId
    } = req.body;
    try{

        const amount = 10;
        if(!orderId || !method) return res.status(400).json({
            error: "orderid and method are required"
        })

        if(amount && amount <= 0){
            return res.status(400).json({
                error: "amount must be greater than 0"
            })
        }

        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            },
            include: {
                items: { include: { product: true } },
                payment: true
            }
        })

         
        if (!order) return res.status(404).json({ error: "Order not found" });
        
        if (order.status !== "PENDING") return res.status(400).json({ error: "Order is not pending" });

        // 2. Find the associated payment
        const payment = order.payment;
        if (!payment) return res.status(404).json({ error: "Payment record missing" });
        
        const totalAmount = order.items.reduce(
            (sum, item) => sum + (Number(item.product.price) * item.quantity),
            0
        );


        const allowedMethod = ["MPESA", "CARD"]

        if(!allowedMethod.includes(method)){
            return res.status(400).json({
                error: "method accepted are MPESA or CARD"
            })
           
        }

        if(method === "MPESA"){
            const {mpesaNumber} = req.body
            
            if(!mpesaNumber) return res.status(400).json({
                error: "bad request, mpesa number required"
            })
            const normalized = formatPhoneNumber(mpesaNumber)
            //make payment by Mpesa
            const stkResponse = await stkPush(normalized, totalAmount, orderId)

            if(stkResponse.ResponseCode !== "0"){
                return res.status(500).json({
                    error: `MPESA payment error: ${stkResponse.ResponseDescription}`
                })
            }

            // Update payment with STK details
            const updatedPayment = await prisma.payment.update({
                    where: { id: payment.id },
                    data: {
                    method: "MPESA",
                    merchantRequestId: stkResponse.MerchantRequestID,
                    checkoutRequestId: stkResponse.CheckoutRequestID,
                    amount: totalAmount,
                    phoneNumber: mpesaNumber
                    
                }
            });

        return res.status(200).json({
            message: "STK Push initiated",
            updatedPayment
        });
        }
        
        if(method === "CARD"){
            //WILL DO
            res.status(501).json({
                error: "card payment not implemented yet"
            })
        }
        
    }catch(error){
        return res.status(500).json({
            error: (error as Error).message
        })
    }
}




export const mpesaCallback: express.RequestHandler = async (req, res) => {
  try {
    const data = req.body as StkCallbackRequest;
    const stk = data.Body.stkCallback;

    if (!data.Body) {
    return res.status(400).json({ error: "Missing Body in callback request" });
  }

  
    if (!stk) {
        return res.status(400).json({ error: "Missing stkCallback in callback request" });
    }

    console.log("Received MPESA Callback:", JSON.stringify(stk, null, 2));

    // Safely extract callback metadata
    const metadata = stk.CallbackMetadata?.Item || [];

    const amount = metadata.find(i => i.Name === "Amount")?.Value as number;
    const mpesaReceiptNumber = metadata.find(i => i.Name === "MpesaReceiptNumber")?.Value as string;
    const phoneNumber = metadata.find(i => i.Name === "PhoneNumber")?.Value as string;
    const rawTransactionDate = metadata.find(i => i.Name === "TransactionDate")?.Value as number;

    // Convert transaction date format YYYYMMDDHHMMSS → Date
    const transactionDate = rawTransactionDate
      ? new Date(
          rawTransactionDate
            .toString()
            .replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:$6")
        )
      : null;

    
    const payment = await prisma.payment.findFirst({
      where: {
        checkoutRequestId: stk.CheckoutRequestID,
        method: "MPESA",
      },
      include: {
        order: true,
      },
    });

    if (!payment) {
      console.error("Payment not found for CheckoutRequestID:", stk.CheckoutRequestID);
      return res.status(404).json({ error: "Payment record not found" });
    }

    
    if (stk.ResultCode === 0) {
      // =======================
      // SUCCESS CASE
      // =======================
      await prisma.$transaction([
        prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: "SUCCESS",
            amount: amount,
            phoneNumber: phoneNumber,
            mpesaReceiptNumber: mpesaReceiptNumber,
            transactionDate: transactionDate,
            rawCallback: stk as unknown as Prisma.InputJsonValue // Store the entire callback for reference
          },
        }),

        prisma.order.update({
          where: { id: payment.orderId },
          data: {
            status: "PAID",
          },
        }),
      ]);

      console.log("Payment SUCCESS. Order marked as PAID.");
    } else {
      
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: "FAILED",
          rawCallback: stk as unknown as Prisma.InputJsonValue,
        },
      });

      console.log("Payment FAILED. Status updated to FAILED.");
    }

    res.status(200).json({ message: "Callback processed successfully" });
  } catch (error) {
    console.error("Error handling MPESA callback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
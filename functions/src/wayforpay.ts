import { onRequest } from "firebase-functions/v2/https"
import * as crypto from "crypto"
const BASE_URL = 'https://6408c5b285b0.ngrok-free.app' // replace it with ngrok address for testing

const merchantAccount_test = "test_merch_n1" // test key from docs
const merchantSecretKey_test = "flk3409refn54t54t*FNJRET" // test key from docs
const CALLBACK_URL = `${BASE_URL}/test-e-commerce-portal/us-central1/wayforpayConfirm` // replace it with ngrok address for testing

type OrderArgs = {
  orderReference: string
  amount: number
  currency: string
  orderData: {
    productId: string
    productName: string
    productCount: string | number
    productPrice: string | number
  }[]
}

export const createPayment = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed")
    return
  }

  const { orderReference, amount, currency, orderData }: OrderArgs = req.body
  const secretKey = merchantSecretKey_test
  const orderDate = Math.floor(Date.now() / 1000)

  const data = {
    merchantAccount: merchantAccount_test,
    merchantDomainName: "example.com",
    orderReference,
    orderDate,
    amount,
    currency,
    productName: orderData.map(p => p.productName),
    productCount: orderData.map(p => p.productCount),
    productPrice: orderData.map(p => p.productPrice),
    serviceUrl: CALLBACK_URL,
  }

  // Формуємо рядок для підпису
  const signatureParts = [
    data.merchantAccount,
    data.merchantDomainName,
    data.orderReference,
    data.orderDate,
    data.amount,
    data.currency,
    ...data.productName,
    ...data.productCount,
    ...data.productPrice,
  ]

  const signatureString = signatureParts.join(";")

  const merchantSignature = crypto
    .createHmac("md5", secretKey)
    .update(signatureString)
    .digest("hex")

  res.json({
    ...data,
    merchantSignature,
  })
})

export const handlePayment = onRequest(async(req, res) => {
  const body = req.body;

  // Перевірка підпису, status платежу тощо
  console.log("WayForPay callback received:", body);

  // Повертаємо відповідь WayForPay
  res.json({ orderReference: body.orderReference, status: "accept" });
});

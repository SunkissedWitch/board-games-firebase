import { updateDoc, type DocumentData, type DocumentReference } from "firebase/firestore"
import type { CartProductType } from "../../firebaseApi/CartApi"
import { fakeFetch } from "../../utils/fakeFetch"

type DoPaymentProps = {
  orderRef: DocumentReference
  orderId: string
  orderData: CartProductType[]
  amount: number
  currency?: string
  callback: (result: string) => void
}

export const doOnlinePayment = async ({
  orderRef,
  orderId,
  orderData,
  amount,
  currency = "UAH",
  callback,
}: DoPaymentProps) => {
  console.log("order data", orderData)
  const productsArray = orderData.map((product) => ({
    productId: product.productId,
    productName: product.productData.title,
    productCount: product.quantity,
    productPrice: product.productData.price,
  }))
  console.log("productsArray", productsArray)
  const response = await fetch("http://127.0.0.1:5001/test-e-commerce-portal/us-central1/wayforpayPayment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderReference: orderId,
      amount,
      currency,
      orderData: productsArray,
    }),
  })

  const data = await response.json()
  console.log("Payment data:", data)
  const expiredJSON = {
    orderReference: "WFP-953-68fa5f4603382",
    transactionStatus: "Expired",
    reason: "Cardholder session expired",
    paymentSystem: "card",
    acquirerBankName: "WayForPay",
  }

  const declinedJSON = {
    orderReference: "WFP-953-68fa6ad40fa79",
    cardPan: "42****4242",
    cardType: "Visa",
    issuerBankCountry: "United Kingdom",
    issuerBankName: "STRIPE PAYMENTS UK LIMITED",
    transactionStatus: "Declined",
    reason: "Declined To Card Issuer",
    paymentSystem: "card",
  }
  const successJSON = {
    transactionStatus: "Approved",
  }
  const mockResponse = await fakeFetch(successJSON, 300)
  if (mockResponse.transactionStatus === "Approved") {
    updateDoc(orderRef, {
      "paymentData.paymenStatus": "success",
    }).then(() => callback("success"))
    // and notify merchant about payment result
  }

  // // ініціалізація WayForPay checkout
  // // @ts-ignore — бібліотека не має типів
  // const wayforpay = new window.Wayforpay()

  // wayforpay.run(
  //   data,
  //   function (response: any) {
  //     console.log("Payment result (on approved):", response)
  //     if (response.transactionStatus === "Approved") {
  //       // on approved
  //       updateDoc(orderRef, {
  //         "paymentData.paymenStatus": "success", // find field name
  //       }).then(() => callback("success"))
  //     }
  //     // if (response.transactionStatus === 'Expired') {
  //     //   // неуспішна оплата, час вичерпано
  //     // }
  //     // Тут можна обробити успішну/невдалу оплату
  //   },
  //   function (response: any) {
  //     console.log("Payment result (on declined):", response)
  //     // {
  //     //     "merchantAccount": "test_merch_n1",
  //     //     "merchantSignature": "a44460e494cf6dd970681643c6f9027c",
  //     //     "orderReference": "WFP-953-68fa6ad40fa79",
  //     //     "amount": 1,
  //     //     "currency": "UAH",
  //     //     "authCode": "",
  //     //     "email": "my_email@gmail.com",
  //     //     "phone": "1234567852", // справжній номер був тут
  //     //     "createdDate": 1761241812,
  //     //     "processingDate": 1761241832,
  //     //     "cardPan": "42****4242",
  //     //     "cardType": "Visa",
  //     //     "issuerBankCountry": "United Kingdom",
  //     //     "issuerBankName": "STRIPE PAYMENTS UK LIMITED",
  //     //     "transactionStatus": "Declined",
  //     //     "reason": "Declined To Card Issuer",
  //     //     "reasonCode": 1101,
  //     //     "fee": 0,
  //     //     "paymentSystem": "card",
  //     //     "clientStartTime": "1761241811432"
  //     // }
  //   },
  //   function (response: any) {
  //     console.log("Payment result (on pending or in processing):", response)
  //   }
  // )
}

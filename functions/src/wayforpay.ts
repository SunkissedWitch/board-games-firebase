import { onRequest } from "firebase-functions/v2/https"
import * as crypto from "crypto"

const merchantAccount_test = "test_merch_n1" // test key from docs
const merchantSecretKey_test = "flk3409refn54t54t*FNJRET" // test key from docs
const CALLBACK_URL = "https://your-project.web.app/" // replace it with ngrok address for testing

export const createPayment = onRequest({ secrets: ["WAYFORPAY_SECRET_KEY"] }, async (req, res) => {
  // const { orderReference, amount, currency, productName } = req.body;

  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed")
    return
  }

  const { orderReference, amount, currency } = req.body
  // process.env.WAYFORPAY_SECRET_KEY буде автоматично підключений
  const secretKey = process.env.WAYFORPAY_SECRET_KEY || merchantSecretKey_test

  /* 
      З метою підтвердження валідності даних повинно бути згенеровано і передано в запиті HMAC_MD5 контрольний підпис з використанням SecretKey торговця.
      Рядок, що підлягає HMAC_MD5, генерується шляхом конкатенації параметрів
      merchantAccount,
      merchantDomainName,
      orderReference,
      orderDate,
      amount,
      currency,
      productName [0], productName [1] ..., productName [n],
      productCount [0],productCount [1], ..., productCount [n],
      productPrice [0], productPrice [1], ..., productPrice [n]
      розділених ";" (крапка з комою) в кодуванні UTF-8
*/
  const now = new Date()
  const signatureSourceObject = {
    merchantAccount: merchantAccount_test,
    merchantDomainName: "www.market.ua",
    orderReference,
    orderDate: now.getTime(),
    amount,
    currency,
  }

  const signatureSource = `${orderReference};${amount};${currency}`
  const signature = crypto.createHmac("md5", secretKey).update(signatureSource).digest("hex")

  res.json({
    orderReference,
    amount,
    currency,
    merchantSignature: signature,
  })
  // })

  // const params = {
  //   merchantAccount: merchantAccount_test,
  //   merchantDomainName,
  //   orderReference,
  //   orderDate,
  //   amount,
  //   currency,
  //   // productName [0], productName [1] ..., productName [n],
  //   // productCount [0],productCount [1], ..., productCount [n],
  //   // productPrice [0], productPrice [1], ..., productPrice [n]
  //   serviceUrl: `${CALLBACK_URL}/callback`,
  // }

  // const sortedValues = Object.keys(params)
  //   .sort()
  //   .map((key) => params[key as keyof typeof params])
  //   .join(";")

  // const signature = crypto.createHmac("sha1", SECRET_KEY).update(sortedValues).digest("base64")

  // res.json({
  //   ...params,
  //   merchantSignature: signature,
  // })
})

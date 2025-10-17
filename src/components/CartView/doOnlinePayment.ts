import type { DocumentData, DocumentReference } from "firebase/firestore"
import type { CartProductType } from "../../firebaseApi/CartApi";

// type OrderArgs = {
//   orderReference: string
//   amount: number
//   currency: string
//   orderData: {
//     productId: string
//     productName: string
//     productCount: string | number
//     productPrice: string | number
//   }[]
// }

export const doOnlinePayment = async (orderId: string, orderData: CartProductType[], amount: number, currency: string = 'UAH') => {
  console.log('order data', orderData)
    const productsArray = orderData.map((product) => ({
    productId: product.productId,
    productName: product.productData.title,
    productCount: product.quantity,
    productPrice: product.productData.price
  }))
  console.log('productsArray', productsArray)
  const response = await fetch(
  "http://127.0.0.1:5001/test-e-commerce-portal/us-central1/wayforpayPayment",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderReference: orderId,
      amount,
      currency,
      orderData: productsArray
    }),
  });

  const data = await response.json();
    console.log("Payment data:", data);

    // ініціалізація WayForPay checkout
    // @ts-ignore — бібліотека не має типів
    const wayforpay = new window.Wayforpay();

    wayforpay.run(data, function (response: any) {
      console.log("Payment result:", response);
      // Тут можна обробити успішну/невдалу оплату
    });

  // const responseWFP = await fetch(`https://secure.wayforpay.com/pay`, {
  //   method: 'POST',
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     ...data
  //   })
  // })
  // const dataWFP = await responseWFP.json();
  // console.log('dataWFP', dataWFP);

}
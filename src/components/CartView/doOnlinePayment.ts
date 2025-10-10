import type { DocumentData, DocumentReference } from "firebase/firestore"
import type { CartProductType } from "../../firebaseApi/CartApi";

export const doOnlinePayment = async (orderId: string, orderData: CartProductType[]) => {
  console.log('order data', orderData)
  const response = await fetch(
  "http://127.0.0.1:5001/test-e-commerce-portal/us-central1/wayforpayPayment",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: 0,
      orderReference: orderId,
      productName: orderData.map((product) => product.productData?.title).join(';'),
    }),
  }
);
const data = await response.json();
console.log(data);

}
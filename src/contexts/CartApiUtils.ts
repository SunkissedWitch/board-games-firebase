import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { cartsRef, productsRef } from "../utils/collectionRefferences";
import { CartProductType, IMinProductData } from "./CartStore";
import { sum } from "lodash";

const sumItems = (arrayCollection: CartProductType[]) => {
  const pricesArray: number[] = arrayCollection.map(
    (element: CartProductType) => element.quantity
  );
  return sum(pricesArray);
};

export async function getCartData(uid: string) {
  const docsRef = doc(cartsRef, uid);
  const docSnap = await getDoc(docsRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const orderList: CartProductType[] = docSnap.get("orderList");
    return { products: orderList, totalItems: sumItems(orderList) };
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return;
  }
}

export const updateList = async (
  uid: string,
  newValue: CartProductType[] | []
) => {
  const orderRef = doc(cartsRef, uid);
  try {
    await updateDoc(orderRef, {
      orderList: newValue,
    });
  } catch (error) {
    console.log("updateList [error]", error);
  }
};

export const addNewProductToCart = async (
  uid: string,
  products: CartProductType[],
  productId: string,
  productData: IMinProductData
) => {
  const docData = {
    orderList: [
      ...products,
      {
        productId,
        productReference: doc(productsRef, productId),
        productData,
        quantity: 1,
      },
    ],
  };
  try {
    await setDoc(doc(db, "carts", uid), docData);
  } catch (error) {
    console.log("error [setDoc][addToCart]", error);
  }
};

export const changeProductQuantity = async (
  uid: string,
  products: CartProductType[],
  productId: string,
  quantity: number
) => {
  const newValue = products.map((product) => {
    if (product?.productId === productId) {
      return {
        ...product,
        quantity: quantity,
      };
    }
    return product;
  });
  await updateList(uid, newValue);
};

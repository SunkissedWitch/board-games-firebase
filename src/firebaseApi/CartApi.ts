import { DocumentData, DocumentReference, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { cartsRef, productsRef } from "../utils/collectionRefferences";
import { sum, pick, get, head } from "lodash";
import { db } from "../firebase";
import { useCartStore } from "../contexts/CartStore";
import { useAuthStore } from "../contexts/AuthStore";

// -- types and interfaces --
export type CartProductType = {
  productId: string
  productData: DocumentData
  productReference: DocumentReference<DocumentData, DocumentData>
  quantity: number
}

export interface IMinProductData {
  price: number
  photo: string[]
  title: string
  productId: string
  category: string
}

export type NewProductToUserCartProps = {
  productId: string,
  productData: DocumentData
}

// -- utils and helpers --
export const sumItems = (arrayCollection: CartProductType[]) => {
  const pricesArray: number[] = arrayCollection.map(
    (element: CartProductType) => element.quantity
  );
  return sum(pricesArray);
};

export const minProductData = (productData: DocumentData) => ({
  ...pick(productData, ['title', 'productId', 'category']),
  price: get(productData, ['description', 'price'], 0),
  photo: head(get(productData,  ['description', 'photo'], []))
}) as IMinProductData

// -- api calls --
export async function getCartData() {
  const { updateProducts, updateTotalItems } = useCartStore.getState()
  const currentUser = useAuthStore.getState().currentUser

  if (currentUser && currentUser.uid) {
    const docsRef = doc(cartsRef, currentUser.uid)
    const docSnap = await getDoc(docsRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      const orderList: CartProductType[] = docSnap.get('orderList')
      updateTotalItems(sumItems(orderList))
      updateProducts(orderList)
      return;
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }
  }

  updateTotalItems(0)
  updateProducts([])
}

export const addNewProductToUserCart = async ({ productId, productData }: NewProductToUserCartProps) => {
  const { products, totalItems, updateProducts, updateTotalItems } = useCartStore.getState()
  const currentUser = useAuthStore.getState().currentUser

  if (currentUser && currentUser.uid) {
  const docData = {
    orderList: [
      ...products,
      {
        productId,
        productReference: doc(productsRef, productId),
        productData: minProductData(productData),
        quantity: 1,
      },
    ],
  };
  try {
    await setDoc(doc(db, "carts", currentUser.uid), docData);
    updateProducts(docData.orderList)
    updateTotalItems(totalItems + 1)
  } catch (error) {
    console.log("error [setDoc][addToCart]", error);
    return false
  }}
}

export const updateList = async (newValue: CartProductType[] | []) => {
  const currentUser = useAuthStore.getState().currentUser
  if (currentUser && currentUser.uid) {
    const orderRef = doc(cartsRef, currentUser.uid);
    try {
      await updateDoc(orderRef, {
        orderList: newValue,
      });
      getCartData()
    } catch (error) {
      console.log("updateList [error]", error);
    }
  }
};


export const changeProductQuantity = async (
  productId: string,
  quantity: number
) => {
  const products = useCartStore.getState().products
  const newValue = products.map((product) => {
    if (product?.productId === productId) {
      return {
        ...product,
        quantity: quantity,
      };
    }
    return product;
  });
  return await updateList(newValue);
};
import { collection } from "firebase/firestore";
import { db } from "../firebase";

const categoriesRef = collection(db, 'categories')
const productsRef = collection(db, 'products')
const ordersRef = collection(db, 'orders')
const usersRef = collection(db, 'users')

export {
  categoriesRef,
  productsRef,
  ordersRef,
  usersRef
}

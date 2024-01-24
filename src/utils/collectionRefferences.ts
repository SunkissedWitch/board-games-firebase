import { collection } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref } from "firebase/storage";

const categoriesRef = collection(db, 'categories')
const productsRef = collection(db, 'products')
const ordersRef = collection(db, 'orders')
const cartsRef = collection(db, 'carts')
const usersRef = collection(db, 'users')
const storageProductsRef = ref(storage, 'products/')

export {
  categoriesRef,
  productsRef,
  ordersRef,
  cartsRef,
  usersRef,
  storageProductsRef
}

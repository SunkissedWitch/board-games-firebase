import { type DocumentData, addDoc, serverTimestamp } from "firebase/firestore"
import { CartItem } from "./CartItem"
import { TotalPrice } from "./TotalPrice"
import { forEach, get } from "lodash"
import { useState } from "react"
import { AddressForm, type DeliveryProps } from "./AddressForm"
import { ordersRef } from "../../utils/collectionRefferences"
import { useNavigate } from "react-router"
import { getTotalItemPrice, getTotalPrice as getTotalPriceUtil } from "../../utils/helpers"
import { useAuthStore } from "../../contexts/AuthStore"
import { useCartStore } from "../../contexts/CartStore"
import { SelectPaymentMethod } from "./SelectPaymentMethod"
import { PAYMENT_OPTIONS } from "../../utils/constants"
import { doOnlinePayment } from "./doOnlinePayment"

interface CartViewProps {
  products: DocumentData[]
}
const STEPS = ["delivery", "payment", "confirmation"]
export type PaymentMethodType = keyof typeof PAYMENT_OPTIONS

export const CartView = ({ products }: CartViewProps) => {
  const currentUser = useAuthStore((state) => state.currentUser)
  const totalItems = useCartStore((state) => state.totalItems)
  const cartState = useCartStore((state) => state.products)
  const clearCart = useCartStore((state) => state.clearCart)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(Object.keys(PAYMENT_OPTIONS)[0] as keyof typeof PAYMENT_OPTIONS)
  const [currentStep, setCurrentStep] = useState<string>(STEPS[0])

  const [delivery, setDelivery] = useState<DeliveryProps | null>(null)
  const navigate = useNavigate()

  const getTotalPrice = () => {
    let totalArray: number[] = []
    forEach(products, (product) => {
      const price = get(product, ['description', 'price'], 0)
      const quantity = get(product, 'quantity', 0)
      const total = getTotalItemPrice(price, quantity)
      totalArray.push(total)
    })
    return getTotalPriceUtil(totalArray)
  }

  const onSubmitAddress = (values: DeliveryProps) => {
    setDelivery(values)
    setCurrentStep("payment")
  }

  const onSelectPayment = (selectedPaymentMethod: PaymentMethodType) => {
    setPaymentMethod(selectedPaymentMethod)
    setCurrentStep("confirmation")
  }
  const paymentMethodString = PAYMENT_OPTIONS?.[paymentMethod] || ""
/*
  Payment Status:
  - pending               - Замовлення створене, оплата ще не здійснена
  - success               - Оплата успішно проведена
  - refunded              - Оплату повернуто / скасовано
  - failed                - Помилка оплати (вимагає ручного втручання)
  - verification_required - Потрібна перевірка менеджером (наприклад, якщо користувач завантажив чек або є підозра на шахрайство)
*/

  const createOrder = async () => {
    const docData = {
      orderData: cartState,
      deliveryData: delivery,
      paymentData: {
        paymentMethod: paymentMethod,
        paymenStatus: 'pending'
      },
      userUID: currentUser?.uid,
      createdAt: serverTimestamp()
    }
    console.log('order', docData)
    try {
      const create = await addDoc(ordersRef, docData)
      if (create?.id) {
        clearCart()
        if (paymentMethod === 'online_payment') {
          doOnlinePayment(create.id, docData.orderData)
          return
        }
        navigate(`/cart/success/${create?.id}`)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const totalPrice = getTotalPrice()

  if (products?.length === 0) {
    return(
      <div className='p-5 border bg-secondary text-secondary-content text-center'>
        Cart is empty. Add something {';)'}
      </div>
    )
  }

  return (
    <div className='px-2.5 sm:px-5 py-5 container max-w-5xl mx-auto grid gap-5 items-start'>
        <div className='text-xl font-bold px-2.5'>Your order:</div>
        <button type='button' className='btn btn-outline btn-sm w-32 ms-auto' onClick={clearCart}>
          Clear cart
        </button>
        {products.map((product: DocumentData) => {
          return <CartItem key={product.productId} product={product} />
        })}
        <AddressForm
          data={delivery}
          onSubmit={onSubmitAddress}
          isCurrentStep={currentStep === "delivery"}
          onEdit={() => setCurrentStep("delivery")}
        />
        <SelectPaymentMethod
          paymentMethod={paymentMethod}
          onSelectPayment={onSelectPayment}
          isCurrentStep={currentStep === "payment"}
          onEdit={() => setCurrentStep("payment")}
        />

       <div className='card card-border shadow-lg gap-5 p-5 lg:mt-12 bg-accent/30'>
        <TotalPrice
          totalPrice={totalPrice}
          totalItems={totalItems}
          delivery={delivery}
          paymentMethod={paymentMethodString}
        />
        <div className='card-actions sm:justify-end'>
          <button
            className='btn btn-primary btn-block sm:btn-wide'
            onClick={createOrder}
            disabled={currentStep !== 'confirmation'}
          >
            Create order
          </button>
        </div>
      </div>
    </div>
  )
}

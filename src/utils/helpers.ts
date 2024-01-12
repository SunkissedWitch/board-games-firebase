import { multiply, sum } from "lodash"

export function formattedPrice (price: number = 0) {
  return price.toLocaleString()
}

export const getTotalItemPrice = (price: number, quantity: number) => {
  return multiply(quantity, price)
}

export const getTotalPrice = (array: number[]) => {
  return sum(array)
}
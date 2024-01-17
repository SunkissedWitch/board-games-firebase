import { multiply, sum } from 'lodash'

export function formattedPrice(price: number = 0) {
  return price.toLocaleString('ua-UA', {
    style: 'currency',
    currency: 'UAH',
    currencyDisplay: 'narrowSymbol',
    currencySign: 'standard',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}

export const getTotalItemPrice = (price: number, quantity: number) => {
  return multiply(quantity, price)
}

export const getTotalPrice = (array: number[]) => {
  return sum(array)
}

export function formattedPrice (price: string = '0') {
  return price.replace(`${price.at(-3)}`, ` ${price.at(-3)}`).trimStart()
}
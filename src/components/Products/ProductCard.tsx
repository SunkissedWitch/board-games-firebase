import { DocumentData } from "firebase/firestore";

export const ProductCard = ({ product }: DocumentData) => {
  const price = product?.description?.price.toString() || '0'
  const formattedPrice = price?.replace(price.at(-3), ` ${price.at(-3)}`).trimStart()

  return (
    <div className="card card-compact">
      <figure className='bg-black'><img src={product?.description?.photo[0] || "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"} alt={product?.title || 'product_image'} /></figure>
      <div className="card-body bg-slate-900 bg-opacity-80 glass">
        <h2 className="card-title">{product?.title}</h2>
        <p>{formattedPrice} грн</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => console.log(product?.productId)}>Buy now!</button>
        </div>
      </div>
    </div>
  )
}
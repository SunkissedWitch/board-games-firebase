import { DocumentData } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { formattedPrice } from "../../utils/helpers";

export const ProductCard = ({ product }: DocumentData) => {
  const navigate = useNavigate()
  const price = product?.description?.price

  return (
    <div className="card card-compact">
      <figure className='bg-black'><img src={product?.description?.photo[0] || "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"} alt={product?.title || 'product_image'} /></figure>
      <div className="card-body bg-slate-900 bg-opacity-80 glass">
        <h2 className="card-title">{product?.title}</h2>
        <p>{formattedPrice(price)} грн</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => navigate(`${product?.category}/${product?.productId}`)}>Buy now!</button>
        </div>
      </div>
    </div>
  )
}
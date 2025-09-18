import type { DocumentData } from "firebase/firestore";
import { useNavigate } from "react-router";
import { formattedPrice } from "../../utils/helpers";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { useEffect, useState } from "react";

export const ProductCard = ({ product }: DocumentData) => {
  const [image, setImage] = useState<string>('')
  const navigate = useNavigate()
  const price = product?.description?.price
  const imagesRef = ref(storage, `products/${product.productId}/images/`)

  // ToDo: try to add image referense to firestore

  useEffect(() => {
    listAll(imagesRef).then((response) => {
      if(response.items.length > 0) {
        getDownloadURL(response.items[0]).then((url) => {
          setImage(url)
        })}
      })
  }, [])

  return (
    <div className="card card-border card-sm bg-linear-to-br from-10% from-slate-900 via-65% via-slate-100 to-95% to-slate-600">
      <figure className='bg-black'>
        <img
          src={
            image ||
            product?.description?.photo[0] ||
            "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          }
          alt={product?.title || 'product_image'}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product?.title}</h2>
        <p>{formattedPrice(price)}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => navigate(`/${product?.category}/${product?.productId}`)}>Buy now!</button>
        </div>
      </div>
    </div>
  )
}

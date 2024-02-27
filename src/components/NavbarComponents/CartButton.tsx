import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

export const CartButton = ({ totalItems }: { totalItems?: number }) => {
  const navigate = useNavigate()
  const goToCart = () => navigate('/cart')

  return (
    <div className="indicator">
      <span className="indicator-item badge badge-primary rounded-full top-1 right-1">{totalItems || 0}</span> 
      <button className="btn btn-square rounded-xl btn-outline btn-sm sm:btn-md" onClick={goToCart}>
        <ShoppingCartIcon className='w-5 h-5 sm:w-7 sm:h-7' />
      </button> 
    </div>
  )
}

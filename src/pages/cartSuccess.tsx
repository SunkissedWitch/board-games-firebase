import { Link, useParams } from "react-router-dom"

export const SuccessPage = () => {
  const { orderId } = useParams()
  return (
    <section className='flex place-content-center flex-grow bg-gradient-to-br from-blue-100 from-40% via-yellow-100 via-90% to-yellow-200 '>
      <div className='card shadow-lg bg-base-100 bg-opacity-30 h-fit my-10 p-5 gap-y-5 max-w-xs'>
        <article className='card-title'>Order successfully created</article>
        <div className='card-body px-0.5'>
          <p>Your order was created successfully. We will contact you shortly.<br/> Thank you for your confidence.</p>
          <p className='mt-5'>You can track your order <Link className='link' to={`/orders/${orderId}`}>here</Link>.</p>
        </div>
        <Link to='/' className='btn btn-outline'>Return to main page</Link>
      </div>
    </section>
  )
}
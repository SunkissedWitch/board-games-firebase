import { Link, useParams } from "react-router-dom"

export const SuccessPage = () => {
  const { orderId } = useParams()
  return (
    <section className='flex flex-col place-content-start justify-items-center w-full flex-grow bg-base-300 relative'>
       <figure className='absolute self-center w-full max-w-lg'>
        <img src='/public/wreath.svg' className='h-auto w-screen py-3'/>
      </figure>
      <div className='flex place-content-center'>
        <div className='card shadow-lg bg-base-100 h-fit my-10 p-5 gap-y-5 max-w-xs'>
          <article className='card-title'>Order successfully created</article>
          <div className='card-body px-0.5'>
            <p>Your order was created successfully. We will contact you shortly.<br/> Thank you for your confidence.</p>
            <p className='mt-5'>You can track your order <Link className='link' to={`/orders/${orderId}`}>here</Link>.</p>
          </div>
          <Link to='/' className='btn btn-outline'>Return to main page</Link>
        </div>
      </div>
    </section>
  )
}
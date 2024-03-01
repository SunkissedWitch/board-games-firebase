import { PlusIcon } from "@heroicons/react/24/solid"

// Todo: add addresses to db, then fetch them to this component

export const AdressesCard = () => {
  return (
    <div className="card bg-base-100 shadow-xl card-compact md:card-normal">
      <div className="card-body">
        <h2 className="card-title">Addresses</h2>
        <p>Your list</p> {/* -- add new functionality with list of addresses -- */}
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-square" onClick={() => console.log('go to address settings')}>
            <PlusIcon className='w-7' />
          </button>
        </div>
      </div>
    </div>
  )
}
type ListType = string[]

export const CategoriesList = ({ list }: { list: ListType }) => {
  return (
    <div className='flex gap-x-3 p-10'>
      {list.map((item, index) => (
        <div className='px-8 py-4 border rounded-lg bg-primary text-primary-content text-lg' key={item + index}>{item}</div>
      ))}
    </div>
  )
}

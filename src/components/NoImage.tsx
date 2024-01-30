export const NoImage = ({ text = 'No Image' }: { text?: string }) => (
  <div className='w-full h-[inherit] bg-base-300 rounded-box border-2 border-neutral border-opacity-20 font-serif font-bold italic text-2xl leading-loose text-base-content text-opacity-40 hidden md:flex items-center justify-center'>
    {text}
  </div>
)

import { getDownloadURL, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { storage } from '../../firebase'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { NoImage } from '../NoImage'

interface ICarouselMiniItem {
  image: string
  index: number
}

interface ICarouselItem extends ICarouselMiniItem {
  length: number
}

export const CarouselItem = ({ image, index, length }: ICarouselItem) => {
  return (
    <div id={`slide${index}`} className='carousel-item relative w-full py-2.5'>
      <a href={image} target='_blank' className=''>
        <img src={image} className='w-full' />
      </a>
      <div className='absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2'>
        <a
          href={index === 0 ? `#slide${length - 1}` : `#slide${index - 1}`}
          className='btn btn-square max-w-max px-1.5 btn-ghost bg-base-300 bg-opacity-30'
        >
          <ChevronLeftIcon className='h-6 stroke-2' />
        </a>
        <a
          href={index === length - 1 ? `#slide0` : `#slide${index + 1}`}
          className='btn btn-square max-w-max px-1.5 btn-ghost bg-base-300 bg-opacity-30'
        >
          <ChevronRightIcon className='h-6 stroke-2' />
        </a>
      </div>
    </div>
  )
}

const CarouselMini = ({ image, index }: ICarouselMiniItem) => {
  return (
    <a href={`#slide${index}`} className='carousel-item'>
      <img
        src={image}
        className='rounded-box w-20 h-20 p-1 border border-opacity-0 border-primary hover:border-opacity-100'
      />
    </a>
  )
}

export const Carousel = ({ images }: { images: string[] }) => {
  if (!images?.length) return <NoImage />

  const [urls, setUrls] = useState<string[]>([])

  useEffect(() => {
    const promises = images.map((image) => getDownloadURL(ref(storage, image)))
    Promise.all(promises).then((downloadURLs) => {
      setUrls(downloadURLs)
    })
  }, [images])

  return (
    <div className='flex flex-col'>
      <div className='carousel w-full space-x-2.5'>
        {urls.map((image: string, index: number) => (
          <CarouselItem
            key={`carousel-${index}`}
            image={image}
            index={index}
            length={images.length}
          />
        ))}
      </div>
      <div className='carousel carousel-center max-w-[inherit] space-x-2.5 p-2.5'>
        {urls.map((image: string, index: number) => (
          <CarouselMini
            key={`carousel-mini-${index}`}
            image={image}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

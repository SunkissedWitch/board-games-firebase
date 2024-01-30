import { useEffect, useState } from "react"
import { FullMetadata, getDownloadURL, getMetadata, ref } from "firebase/storage"
import { storage } from "../../firebase"
import { DocumentIcon } from "@heroicons/react/24/solid"

interface IFileAttributes {
  url: string
  visibleName: string
  type: string
}

interface IFilesUrls {
  files: IFileAttributes[]
}
export const FileItem = ({ file }: { file: IFileAttributes }) => {
  const [url, setUrl] = useState<string>('')
  const [meta, setMeta] = useState<FullMetadata>()
  const isPDFtype = file?.type === 'PDF'
  if (!isPDFtype) return null

  const fileRef = ref(storage, file.url)
  const toMb = (size: number) => {
    const mb = size / (1024 * 1024)
    return mb.toFixed(1)
  }

  useEffect(() => {
    getDownloadURL(fileRef).then((url) => setUrl(url))
    getMetadata(fileRef).then(meta => setMeta(meta))
  },[])

  return (
    <div className='grid grid-flow-col justify-start gap-3 w-full'>
      <div className='py-1'>
        <DocumentIcon width={38} height={38} className='text-primary text-opacity-50' />
      </div>
      <div className='flex flex-col gap-y-2.5'>
        <a
          href={url}
          download={file.visibleName}
          target='_blank'
          referrerPolicy='no-referrer'
          className='font-medium'
        >
          {file.visibleName}
        </a>
        {meta?.size && <div className='text-xs'>{toMb(meta.size)} MB</div>}
      </div>
    </div>
  )
}

export const FilesList = ({ files }: IFilesUrls) => {
  if (!files) return <div className='flex flex-col place-content-center text-error'>No attached files for this product</div>

  return (
    <div className='flex flex-col gap-y-2.5'>
      {files.map(file => (
        <FileItem key={file.url} file={file} />
      ))}
    </div>
  )
}
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../contexts/AuthStore'

export const AccountSettings = () => {
  const profileName = useAuthStore((store) => store.currentUser?.displayName || store.currentUser?.email)
  const uid = useAuthStore((store) => store.currentUser?.uid)
  const updateUserDisplayName = useAuthStore(
    (store) => store.updateUserDisplayName
  )
  const updateUserProfile = useAuthStore(
    (store) => store.updateUserProfile
  )

  const setNewData = async (data: DataValues) => {
    if (uid) {
      updateUserProfile(data)
    }
  }
  console.log('uid', uid)
  return (
    <div className='flex flex-col grow'>
      <h1 className='text-xl md:text-3xl font-semibold'>Account settings</h1>
      <div className='card shadow-xl'>
        <div className='card-body'>
        <div className='card-title'>{profileName}</div>
          <DisplayNameForm setNewData={setNewData} />
        </div>
      </div>
    </div>
  )
}

type DataValues = {
  displayName?: string
  photoURL?: string
}

type InputValues = {
  displayName: string
  photoFile: File[] | null
  // photoURL: string
}

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storageUserFilesRef } from '../utils/collectionRefferences'
import { storage } from '../firebase'
const DisplayNameForm = ({ setNewData }: { setNewData: (params: DataValues) => Promise<void> }) => {
  const { register, handleSubmit, formState: { errors }, resetField } = useForm({
    defaultValues: {
      displayName: '',
      photoFile: null
      // photoURL: ''
    },
  })
  const uid = useAuthStore((store) => store.currentUser?.uid)

  const onSubmit = async (data: InputValues) => {
    console.log(data)
    const { displayName, photoFile } = data
    console.log('photoFile', photoFile)
    let photoURL = undefined
    if (photoFile) {
      const downloadURL = await uploadPhoto(photoFile[0])
      photoURL = downloadURL
    }
    await setNewData({ displayName, photoURL })
    resetField('displayName')
  }

  const uploadPhoto = async (file: File) => {
    const snapshot = await uploadBytes(ref(storage, `user_files/${uid}`), file, { customMetadata: { name: 'avatar' } })
    console.log('Uploaded a blob or file!', snapshot.metadata)

    const downloadURL = await getDownloadURL(snapshot.ref)
    console.log('downloadURL', downloadURL)
    return downloadURL
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid grid-flow-row gap-5'>

      <label className="form-control w-full">
        <span className="label label-text">Display Name</span>
        <input
          {...register('displayName', { required: 'is required' })}
          type="text"
          placeholder="Type here"
          className="input input-primary input-bordered w-full max-w-sm"
          />
        {errors?.displayName && <div className="label label-text-alt text-error">{errors?.displayName.message}</div>}
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label label-text">Pick a file</div>
        <input
          {...register('photoFile')}
          type="file"
          accept='image/*'
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <div className="label label-text-alt">Alt label</div>
      </label>

      <button type='submit' className='btn btn-primary btn-wide justify-self-end'>
        Confirm
      </button>
    </form>
  )
}

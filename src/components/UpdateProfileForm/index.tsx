import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useForm } from 'react-hook-form'
import { storage } from "../../firebase";
import { useAuthStore } from "../../contexts/AuthStore";
import { IProfileFormProps } from "../../pages/accountSettings";

type InputValues = {
  displayName: string
  photoFile: File[] | null
}

export const UpdateProfileForm = ({ setNewData }: { setNewData: (params: IProfileFormProps) => Promise<void> }) => {
  const profileName = useAuthStore((store) => store.currentUser?.displayName || '')
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      displayName: profileName,
      photoFile: null
    },
  })
  const uid = useAuthStore((store) => store.currentUser?.uid)

  const onSubmit = async (data: InputValues) => {
    console.log(data)
    const { displayName, photoFile } = data

    let photoURL = undefined
    if (photoFile) {
      const downloadURL = await uploadPhoto(photoFile[0])
      photoURL = downloadURL
    }
    await setNewData({ displayName, photoURL })
  }

  const uploadPhoto = async (file: File) => {
    const snapshot = await uploadBytes(ref(storage, `user_files/${uid}`), file, { customMetadata: { name: 'avatar' } })
    console.log('Uploaded a blob or file!', snapshot.metadata)

    const downloadURL = await getDownloadURL(snapshot.ref)
    console.log('downloadURL', downloadURL)
    return downloadURL
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid grid-flow-row gap-5 py-2.5'>

      <label className="form-control w-full max-w-xs">
        <span className="label label-text">Display Name</span>
        <input
          {...register('displayName')}
          type="text"
          placeholder="Type here"
          className="input input-primary input-bordered w-full"
          />
        {errors?.displayName && <div className="label label-text-alt text-error">{errors?.displayName.message}</div>}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label label-text">Pick a file</div>
        <input
          {...register('photoFile')}
          type="file"
          accept='image/*'
          className="file-input file-input-bordered w-full"
        />
      </label>

      <button type='submit' className='btn btn-primary btn-wide justify-self-end'>
        Confirm
      </button>
    </form>
  )
}

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useForm, useWatch } from 'react-hook-form'
import { storage } from "../../firebase";
import { useAuthStore } from "../../contexts/AuthStore";
import { type IProfileFormProps } from "../../pages/accountSettings";

type InputValues = {
  displayName: string
  photoFile: File[] | null
}

export const UpdateProfileForm = ({ setNewData }: { setNewData: (params: IProfileFormProps) => Promise<void> }) => {
  const profileName = useAuthStore((store) => store.currentUser?.displayName || '')
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      displayName: profileName,
      photoFile: null
    },
  })
  const photoFile = useWatch({
    name: 'photoFile',
    control
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
  const photoUrl = photoFile ? URL.createObjectURL(photoFile[0]) : null

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-5xl place-self-center grid md:grid-cols-2 w-full gap-5 gap-x-10 py-2.5'>

      <fieldset className="fieldset">
        <label htmlFor="displayName" className="label">Display Name</label>
        <input
          {...register('displayName')}
          id='displayName'
          type="text"
          placeholder="Type here"
          className="input input-primary w-full"
          />
        {errors?.displayName && <label htmlFor="displayName" className="label text-error text-xs">{errors?.displayName.message}</label>}

        <label htmlFor="photoFile" className="label mt-3">Pick a file</label>
        <input
          {...register('photoFile')}
          type="file"
          id='photoFile'
          accept='image/*'
          className="file-input file-input-primary w-full"
        />

      </fieldset>

      <div className='flex md:justify-end items-stretch avatar placeholder max-md:order-first size-32 self-end md:ms-auto'>
        {photoUrl !== null
          ? <figure className="rounded-full">
              <img src={photoUrl} alt='Profile Picture' />
            </figure>
          : <div className="border border-primary max-md:min-h-[100px]">
              <div>Image</div>
            </div>
        }
      </div>

      <button type='submit' className='btn btn-primary btn-wide justify-self-end md:col-span-2 mt-3'>
        Confirm
      </button>
    </form>
  )
}

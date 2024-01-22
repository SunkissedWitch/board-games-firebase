interface IContactInfo {
  username: string
  tel: string
  email: string
}

export const ContactInfo = ({ data }: { data: IContactInfo }) => {
  const { tel, username, email } = data
  return (
    <div className='flex flex-col p-2.5'>
      <h6 className='card-title'>Contact Info:</h6>
      <div className='flex flex-col gap-1'>
        <div>{username}</div>
        <div>{email}</div>
        <div>{tel}</div>
      </div>
    </div>
  )
}
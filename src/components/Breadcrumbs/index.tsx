import { Params, useMatches } from 'react-router-dom'

interface IMatches {
  id: string
  pathname: string
  params: Params<string>
  data: unknown
  handle: unknown
}

type HandleType = {
  crumb: (param?: string) => React.ReactNode
}

export const Breadcrumbs = () => {
  const matches: IMatches[] = useMatches()
  const crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) =>
      Boolean(match.handle && (match.handle as HandleType).crumb)
    )
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => {
      const crumb = (match.handle as HandleType).crumb(
        match.data as string | undefined
      )
      return crumb as React.ReactNode
    })

  return (
    <div className='breadcrumbs'>
      <ul>
        {crumbs.map((crumb, index) => (
          <li key={index}>{crumb}</li>
        ))}
      </ul>
    </div>
  )
}

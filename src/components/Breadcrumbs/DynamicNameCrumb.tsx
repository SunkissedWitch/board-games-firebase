import { Link, useLocation, useParams } from "react-router-dom"

export const DynamicNameCrumb = () => {
  const location = useLocation()
  const params = useParams()
  return (
    <Link to={location.pathname}>{Object.values(params).toString()}</Link>
  )

}
import { ReactNode } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorBlock = ({ children }: { children: ReactNode }) => {
  return (
    <div className='container alert alert-error place-self-center text-center my-5'>
      {children || "There is nothing here! Go away!"}
    </div>
  )
}

export const RootBoundary = () => {
    const error = useRouteError();
  
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        return <ErrorBlock>{error?.data?.message || "This page doesn't exist!"}</ErrorBlock>;
      }
  
      if (error.status === 401) {
        return <ErrorBlock>You aren't authorized to see this</ErrorBlock>;
      }
  
      if (error.status === 503) {
        return <ErrorBlock>Looks like our API is down</ErrorBlock>;
      }
  
      if (error.status === 418) {
        return <ErrorBlock>&#x1FAD6;</ErrorBlock>;
      }
    }
  
    return <ErrorBlock>Something went wrong</ErrorBlock>;
}

import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const RootBoundary = () => {
    const error = useRouteError();
  
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        return <div>{error?.data?.message || "This page doesn't exist!"}</div>;
      }
  
      if (error.status === 401) {
        return <div>You aren't authorized to see this</div>;
      }
  
      if (error.status === 503) {
        return <div>Looks like our API is down</div>;
      }
  
      if (error.status === 418) {
        return <div>🫖</div>;
      }
    }
  
    return <div>Something went wrong</div>;
  // return (
  //   <div className='p-10 rounded flex place-self-center border border-error text-error-content bg-error bg-opacity-40'>There is nothing here! Go away!</div>
  // )
}
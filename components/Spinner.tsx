import React from 'react'
/// ctrl + D change first and last
// /ctrl + shift + L
const Spinner = () => { 
  return (
    <div>
        <div
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 ml-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>
    </div>
  )
}

export default Spinner
import React from 'react'

function Title({title,description}) {
  return (
    <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-serif'>{title}</h1>
        <p className='py-4  text-20' >{description}</p>
    </div>
  )
}

export default Title

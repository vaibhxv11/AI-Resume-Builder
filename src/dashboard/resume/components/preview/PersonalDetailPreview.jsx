import React from 'react'

function PersonalDetailPreview({resumeInfo}) {
  return (
    <div>
        <h2 className='font-bold text-xl text-center '>{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>


    </div>
  )
}

export default PersonalDetailPreview
import React from 'react'

function EducationalPreview({ resumeInfo }) {
  const formatDate = (dateString) => {
    if (!dateString) return ''; // Handle empty dates gracefully
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2  '
        style={{
          color: resumeInfo?.attributes?.themeColor
        }}  > Education</h2>

      <hr style={{
        borderColor: resumeInfo?.attributes?.themeColor
      }}
      />

      {
        resumeInfo?.attributes?.education?.map((education, index) => (
          <div key={index} className='my-5'>
            <h2 className='text-sm font-bold '
              style={{
                color: resumeInfo?.attributes?.themeColor
              }} >
              {education?.universityName}
            </h2>
            {/* <h2 className='text-xs flex justify-between '>
                            {education.degree} in {education?.major}
                            <span>  {education?.startDate} to {education?.endDate}  </span>
                        </h2> */}

            <h2 className='text-xs flex justify-between'>
              {education.degree} in {education?.major}
              <span>{formatDate(education?.startDate)} - {formatDate(education?.endDate)}</span>
            </h2>
            <p className='text-xs my-2'>
              {education?.description}
            </p>



          </div>
        ))
      }


    </div>
  )
}

export default EducationalPreview
import React from 'react'

function ExperiencePreview({ resumeInfo }) {
  const formatDate = (dateString) => {
    if (!dateString) return ''; // Handle empty dates gracefully
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

  return (
    <div className='my-6 '>
      <h2 className='text-center font-bold text-sm mb-2  '
        style={{
          color: resumeInfo?.attributes?.themeColor
        }}  >Professional Experience</h2>

      <hr style={{
        borderColor: resumeInfo?.attributes?.themeColor
      }}
      />


      {resumeInfo?.attributes?.experience?.map((experience, index) => (
        <div key={index} className='my-5 '  >
          <h2 className='text-sm font-bold '>{experience?.title}</h2>
          <h2 className='text-xs flex justify-between'>{experience?.companyName} ,
            {experience?.city} ,
            {experience?.state} ,
            <span>
              {formatDate(experience.startDate)} - {experience.currentlyWorking ? 'Present' : formatDate(experience.endDate)}
            </span>

          </h2>


          <div dangerouslySetInnerHTML={{ __html: experience.workSummary }} />




        </div>
      ))}

    </div>
  )
}

export default ExperiencePreview
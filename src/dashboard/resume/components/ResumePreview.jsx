import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
function ResumePreview() {

    const {resumeInfo , setResumeInfo}=useContext(ResumeInfoContext)
    useEffect(()=>{
      console.log("resumeInfo is:" ,resumeInfo)
    })



  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]  '
      style={{
        borderColor:resumeInfo?.attributes?.themeColor
      }}  >
        {/* Personal Deatil */}
        <PersonalDetailPreview resumeInfo={resumeInfo}/>

        {/* Summary */}
        <SummaryPreview resumeInfo={resumeInfo}/>



        {/* Professional Experience */}
        <ExperiencePreview resumeInfo={resumeInfo}/>

        {/* Educational */}
        <EducationalPreview resumeInfo={resumeInfo} />

        {/* Skills */}
        <SkillsPreview resumeInfo={resumeInfo}/>



    </div>
  )
}

export default ResumePreview
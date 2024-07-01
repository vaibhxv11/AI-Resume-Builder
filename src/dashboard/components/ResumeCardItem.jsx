import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function ResumeCardItem({resume }) {

   console.log(resume?.attributes)
  return (
    <Link to={'/dashboard/resume/'+resume?.id+"/edit"}>
        <div className='p-14 bg-secondary flex items-center justify-center border border-primary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md shadow-primary '>
            <Notebook/>

        </div>
        <h2 className='text-center my-2 '>{resume.title}</h2>

        
    </Link>
  )
}

export default ResumeCardItem
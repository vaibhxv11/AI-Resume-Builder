
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

function Skills() {

    const [skillsList ,setSkillsList ]=useState([{
        name:'' ,
        rating:0
    }])

    const handleChange=()=>{


    }



  return (
     

<div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-1'>

<h2 className='font-bold text-lg'>Skills </h2>
<p>Add Your Professional Skills </p>
<div>
    {skillsList.map((item ,index)=>(
        <div className='flex justify-between'>
            <div>
                <label className='text-xs'>Name</label>
                <Input className="w-full" onChange={(e)=>handleChange(index , 'name' ,e.target.value) }/>
            </div>
            <Rating style={{ maxWidth: 120 }} value={item.rating} onChange={(v)=>handleChange(index , 'rating' , v)} />
        </div>
    ))}

    </div>
    </div>

  )
}

export default Skills
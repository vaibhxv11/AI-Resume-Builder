import React from 'react'

function Education() {
  return (
    <div>
        <h2 className='font-bold text-lg '>Education</h2>
         <p>Add Your Educational Details</p>

         <div>

            {educationList.map((item , index)=>(
                
                <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>

                    <div className='col-span-2 '>
                        <label > University Name </label>
                        <Input name="universityName"  
                        onChange={(e)=>handleChange(e , index) }
                          defaultValue={item?.universityName} 
                            />

                    </div>

                </div>

            ))}
         </div>


    </div>
  )
}

export default Education
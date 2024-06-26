import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: '' 

}
function Experience() {

    const [experienceList, setExperienceList] = useState([
        formField
    ])

    const {resumeInfo ,setResumeInfo}=useContext(ResumeInfoContext)
    const params=useParams();
    const [loading,setLoading]=useState(false);

     
    useEffect(()=>{
        resumeInfo?.Experience?.length > 0 && setExperienceList(resumeInfo?.Experience)
        
    },[])

    const handleChange=(index , event)=>{
        const newEntries = experienceList.slice();
        const {name , value}=event.target;
        newEntries[index][name]=value;
        console.log(newEntries)
        setExperienceList(newEntries)


    }
  
     const AddNewExperience=()=>{
         setExperienceList([...experienceList , formField])
     }

     const RemoveExperience =()=>{
        setExperienceList(experienceList=>experienceList.slice(0 , -1))

     }

     const handleRichTextEditor=(e , name , index)=>{
        const newEntries = experienceList.slice();
        newEntries[index][name]=e.target.value;
        setExperienceList(newEntries)

     }

     useEffect(()=>{
          console.log(experienceList)
          setResumeInfo({
            ...resumeInfo ,
            experience:experienceList 
          })
     } , [experienceList])

     const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                experience:experienceList.map(({ id, ...rest }) => rest)
            }
        }

         console.log(experienceList)

        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(res=>{
            console.log(res);
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
        })

    }


    return (
        <div>

            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-1'>

                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add Your previous Job experience </p>
                 <div>
                    {
                        experienceList.map((item , index)=>(
                         <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg '>
                                 <div>
                                     <label  className='text-xs'>Position Title</label>
                                     <Input name="title"   defaultValue={item?.title}  onChange={(event)=>handleChange(index , event)}/>
                                 </div>
                                 <div>
                                     <label  className='text-xs'>Company Name</label>
                                     <Input name="companyName" defaultValue={item?.companyName}  onChange={(event)=>handleChange(index , event)}/>
                                 </div>
                                 <div>
                                     <label  className='text-xs'>City</label>
                                     <Input name="city"   defaultValue={item?.city} onChange={(event)=>handleChange(index , event)}/>
                                 </div>
                                 <div>
                                     <label  className='text-xs'>State</label>
                                     <Input name="state"   defaultValue={item?.state} onChange={(event)=>handleChange(index , event)}/>
                                 </div>
                                 <div>
                                     <label  className='text-xs'>Start Date</label>
                                     <Input type="date" name="startDate"  defaultValue={item?.startDate} onChange={(event)=>handleChange(index , event)}/>
                                 </div>
                                 <div>
                                     <label  className='text-xs'>End Date</label>
                                     <Input type="date" name="endDate"  defaultValue={item?.endDate} onChange={(event)=>handleChange(index , event)}/>
                                 </div>

                                 <div className='col-span-2'>
                                    <RichTextEditor index={index} onRichTextEditorChange={(event)=>handleRichTextEditor(event , 'workSummary' , index)}/>
                                 </div>

                            </div>

 

                         </div>
                        ))
                    }
                 </div>

                 <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
            <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>

            </div>





        </div>
    )
}

export default Experience
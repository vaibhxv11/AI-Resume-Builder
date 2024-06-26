import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
function PersonalDetail({enableNext}) {
    const params=useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
   const [formData , setFormData]=useState();
    const [loading , setLoading]=useState(false);
    
    const handleChange = (e) => {
        enableNext(false)
        const {name , value}=e.target;

         setFormData({
             ...formData ,
             [name]:value
         })

        setResumeInfo({
            ...resumeInfo ,

            [name]:value

        })


    }

    const submitHandler=(e)=>{
        e.preventDefault() ;
        setLoading(true)

        const data={
            data :formData
             
        }


        GlobalApi.UpdateResumeDetail(params?.resumeId ,data ).then(resp=>{
            console.log(resp)
            enableNext(true);
            setLoading(false);
             toast("Derails Updated!")
        } ,(error)=>{
            setLoading(false);
        } )
      

    }

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-1'>

            <h2 className='font-bold text-lg'>Perosonal Details</h2>
            <p>Get Started with the basic information</p>

            <form onSubmit={submitHandler}>
                <div className='grid grid-cols-2 mt-5 gap-3 '>
                    <div>
                        <label className='text-sm' >First Name</label>
                    <Input  name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleChange}/>
                    </div>

                    <div>
                        <label className='text-sm' >Last Name</label>
                    <Input  name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleChange}/>
                    </div>

                    <div className='col-span-2'>
                        <label className='text-sm' >Job Title</label>
                    <Input  name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleChange}/>
                    </div>

                    <div className='col-span-2'>
                        <label className='text-sm' >Address</label>
                    <Input  name="address" defaultValue={resumeInfo?.address} required onChange={handleChange}/>
                    </div>

                    
                    <div>
                        <label className='text-sm' >Phone</label>
                    <Input  name="phone" defaultValue={resumeInfo?.phone} required onChange={handleChange}/>
                    </div>

                    
                    <div>
                        <label className='text-sm' >Email</label>
                    <Input  name="email" defaultValue={resumeInfo?.email} required onChange={handleChange}/>
                    </div>

                    

                </div>
                <div className='mt-3 flex justify-end '>
                    <Button type="submit" disabled={loading}>

                        {loading ? <LoaderCircle className='animate-spin '/> : "Save"}
                    </Button>
                </div>



            </form>


        </div>
    )
}

export default PersonalDetail
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../service/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react'
import { AIChatSession } from '../../../../../service/AIModel'


const prompt="Job Title: {jobTitle} , Depends on job title give me summery for my resume within 4-5 lines in JSON format with field experience level and Summary with Experience level for Fresher , Mid-Level , Experienced"
function Summary({ enableNext }) {

   

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [summary, setSummary] = useState();
    const [loading, setLoading] = useState(false);
    const params = useParams()
    const [generatedSummaryList , setGeneratedSummaryList]=useState([]);

    useEffect(() => {
        summary && setResumeInfo({
            ...resumeInfo,
            summary: summary

        })

    }, [summary])

    const GenerateSummaryFromAI=async ()=>{
         setLoading(true)
        const PROMPT=prompt.replace('{jobtitle}', resumeInfo?.jobTitle);
         console.log(PROMPT)
        const result=await AIChatSession.sendMessage(PROMPT);
        console.log(JSON.parse(result.response.text()));
        setGeneratedSummaryList(JSON.parse([result.response.text()]))
        setLoading(false);

    }

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true)

        const data = {
            data: {
                summary: summary
            }

        }

        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
            console.log(resp)
            enableNext(true);
            setLoading(false);
            toast("Derails Updated!")
        }, (error) => {
            setLoading(false);
        })


    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-1'>

                <h2 className='font-bold text-lg'>Summary Details</h2>
                <p>Add Summary for your job title </p>

                <form className='mt-7' onSubmit={onSave} >

                    <div className='flex justify-between items-end'>
                        <label>Add Summary    </label>
                        <Button variant="outline" onClick={()=>GenerateSummaryFromAI()} type="button" size="sm" className="border-primary text-primary flex gap-2 "> <Brain className='h-4 w-4' />  Generate from AI </Button>
                    </div>
                    <Textarea className="mt-6" required onChange={(e) => setSummary(e.target.value)} />

                    <div className='mt-2 flex justify-end'>
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin ' /> : "Save"}
                        </Button>   </div>


                </form>



            </div>
      
       
           {   generatedSummaryList.length > 0 && <div>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {
                    generatedSummaryList.map((item , index)=>(
                        <div>
                            <h2 className='font-bold my-2'>Level :{item.experienceLevel}</h2> 
                            <p> {item?.summary}</p>

                        </div>
                    ))

                }

            </div> }




        </div>
    )
}

export default Summary
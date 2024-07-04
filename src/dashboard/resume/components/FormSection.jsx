import React , {useState} from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { ArrowLeft, ArrowRight, LayoutGrid  , Home} from 'lucide-react'
import { Button } from '@/components/ui/button';
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';
function FormSection() {

    const [activeFormIndex , setActiveFormIndex]=useState(1);
    const [enableNext , setEnableNext]=useState(true)
   const {resumeId} =useParams();

  return (
    <div>
        <div className='flex justify-between items-center mb-3'>
             
        <div className='flex gap-5'>
            <Link to={"/dashboard"}>
          <Button><Home/></Button>
          </Link>
          <ThemeColor/>
         
          </div>
     
     
            <div className='flex gap-2'>
                {activeFormIndex > 1 && <Button size="sm" onClick={()=>setActiveFormIndex(activeFormIndex-1)} ><ArrowLeft/></Button>}
                <Button disabled={!enableNext}  className="flex gap-2" size="sm"  onClick={()=>setActiveFormIndex(activeFormIndex+1)}   >Next <ArrowRight/>  </Button>
            </div>
        </div>

        {/* Personal Detail */}
       {activeFormIndex==1 ?  <PersonalDetail  enableNext={(v)=>setEnableNext(v)}      />


       : activeFormIndex==2 ? <Summary  enableNext={(v)=>setEnableNext(v)}/> 
       : activeFormIndex==3 ? <Experience   enableNext={(v)=>setEnableNext(v)} /> : 
       activeFormIndex==4 ? <Education />  
       :  activeFormIndex==5 ? <Skills/> 
       :  activeFormIndex==6 ? <Navigate to={'/my-resume/'+resumeId+"/view"}/>   : null }

        {/* Summery */}

        {/* Experience  */}

        {/* Educational Detail */}

        {/* Skills' */}





    </div>
  )
}

export default FormSection

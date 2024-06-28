import React , {useState} from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button';
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';

function FormSection() {

    const [activeFormIndex , setActiveFormIndex]=useState(1);
    const [enableNext , setEnableNext]=useState(false)
  return (
    <div>
        <div className='flex justify-between items-center mb-3'>
            <Button variant="outline" size="sm" className="flex gap-2 "> <LayoutGrid/>  Theme</Button>
            <div className='flex gap-2'>
                {activeFormIndex > 1 && <Button size="sm" onClick={()=>setActiveFormIndex(activeFormIndex-1)} ><ArrowLeft/></Button>}
                <Button disabled={!enableNext}  className="flex gap-2" size="sm"  onClick={()=>setActiveFormIndex(activeFormIndex+1)}   >Next <ArrowRight/>  </Button>
            </div>
        </div>

        {/* Personal Detail */}
       {activeFormIndex==1 ?  <PersonalDetail  enableNext={(v)=>setEnableNext(v)}/>
       : activeFormIndex==2 ? <Summary  enableNext={(v)=>setEnableNext(v)}/> 
       : activeFormIndex==3 ? <Experience   enableNext={(v)=>setEnableNext(v)} /> : 
       activeFormIndex==4 ? <Education />  : null   }

        {/* Summery */}

        {/* Experience  */}

        {/* Educational Detail */}

        {/* Skills' */}





    </div>
  )
}

export default FormSection
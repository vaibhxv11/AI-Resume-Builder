import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { Button } from '@/components/ui/button';
import { AIChatSession } from '../../../../service/AIModel';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'

function RichTextEditor({onRichTextEditorChange , index , defaultValue}) {

    

    const [value, setValue] = useState();
    const [resumeInfo , setResumeInfo]=useContext(ResumeInfoContext)
    const [loading   , setLoading]=useState(false);
      

    const GenerateSummaryFromAI=async ()=>{
        setLoading(true)
        if(!resumeInfo?.Experience[index]?.title){
            toast("Please Add Position Title")
            return;
            
        }

        
    setLoading(true)
    const prompt=PROMPT.replace('{positionTitle}' , resumeInfo.Experience[index].title);
     
    const result= AIChatSession.sendMessage(prompt);
    console.log((await result).response.text());
    const resp=result.response.text()
    setValue(resp.replace('[' , '').replace(']' ,''))
    setLoading(false);

    }
  




    return (
        <div>

            <div className='flex justify-between my-2 '>
                 <label className='text-xs' >Summary</label>
                 <Button variant="outline" size="sm" className="flex gap-2 border-primary text-primary  ">
                {loading ? <LoaderCircle className='animate-spin'/> :    <><Brain className='h-4 w-4 '/>  Generate from AI  </>  }   </Button>
            </div>

            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value)
                    onRichTextEditorChange(e)

                }}>

                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough/>
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                        <BtnClearFormatting />
                        <HtmlButton />
                        <Separator/>
                        <BtnStyles />
                    </Toolbar>


                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor
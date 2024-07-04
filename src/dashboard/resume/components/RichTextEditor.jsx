import { Button } from '@/components/ui/button';

import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { Editor, EditorProvider, Toolbar, BtnBold, BtnItalic, BtnUnderline, BtnStrikeThrough, BtnNumberedList, BtnBulletList, BtnLink, Separator } from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModel';
import { Brain } from 'lucide-react';

const PROMPT = 'position title: {positionTitle}, Based on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array), give me the result in HTML tags';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
    const [value, setValue] = useState(defaultValue);
    const { resumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    const GenerateSummaryFromAI = async () => {
        if (!resumeInfo?.attributes?.experience[index]?.title) {
            toast('Please Add Position Title');
            return;
        }
        setLoading(true);
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.attributes?.experience[index]?.title);
        const result = await AIChatSession.sendMessage(prompt);
        const resp = await result.response.text();
        setValue(resp.replace('[', '').replace(']', ''));
        setLoading(false);
    }

    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-xs'>Summary</label>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={GenerateSummaryFromAI}
                    disabled={loading}
                    className="flex gap-2 border-primary text-primary"
                >
                    {loading ? <LoaderCircle className='animate-spin' /> :
                        <>
                            <Brain className='h-4 w-4' /> Generate from AI
                        </>
                    }
                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e.target.value, index);
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor


import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { AIChatSession } from '../../../../../service/AIModel';
import { toast } from 'sonner';

const prompt = "Job Title: {jobTitle}, Based on the job title, give me a list of summaries for 3 experience levels: Mid Level and Fresher level in 3-4 lines in array format, with summary and experience_level fields in JSON format";

function Summary({ enableNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState([]);

    useEffect(() => {
        if (resumeInfo?.attributes?.summary) {
            setSummary(resumeInfo.attributes.summary);
        }
    }, [resumeInfo]);

    const GenerateSummaryFromAI = async () => {
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.attributes?.jobTitle || '');
        console.log(PROMPT);
        const result = await AIChatSession.sendMessage(PROMPT);
        const responseText = await result.response.text();
        console.log(JSON.parse(responseText));
        setAiGenerateSummaryList(JSON.parse(responseText));
        setLoading(false);
    };

    const handleChange = (e) => {
        enableNext(false);
        setSummary(e.target.value);
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            data: {
                summary: summary
            }
        };
        console.log("data after save:", params?.resumeId, data);

        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
            console.log('API Response:', resp);
            setResumeInfo(prev => ({
                ...prev,
                attributes: {
                    ...prev.attributes,
                    summary: summary
                }
            }));
            enableNext(true);
            setLoading(false);
            toast("Details updated!");
        }, (error) => {
            console.error('API Error:', error);
            setLoading(false);
        });
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Summary</h2>
            <p>Add Summary for your job title</p>

            <form className='mt-7' onSubmit={onSave}>
                <div className='flex justify-between items-end'>
                    <label>Add Summary</label>
                    <Button variant="outline" onClick={GenerateSummaryFromAI} 
                    type="button" size="sm" className="border-primary text-primary flex gap-2">
                        <Brain className='h-4 w-4' />  Generate from AI
                    </Button>
                </div>
                <Textarea className="mt-5" required
                    value={summary}
                    onChange={handleChange}
                />
                <div className='mt-2 flex justify-end'>
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </form>

            {aiGeneratedSummaryList.length > 0 && <div className='my-5'>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {aiGeneratedSummaryList.map((item, index) => (
                    <div key={index} onClick={() => setSummary(item?.summary)}
                        className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                        <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                        <p>{item?.summary}</p>
                    </div>
                ))}
            </div>}
        </div>
    );
}

export default Summary;

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

function Education() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [educationalList, setEducationalList] = useState([]);

    useEffect(() => {
        if (resumeInfo?.attributes?.education) {
            setEducationalList(resumeInfo.attributes.education);
        }
    }, [resumeInfo]);

    const handleChange = (index, event) => {
        const newEntries = [...educationalList];
        const { name, value } = event.target;
        newEntries[index] = {
            ...newEntries[index],
            [name]: value
        };
        setEducationalList(newEntries);

        setResumeInfo(prevInfo => ({
            ...prevInfo,
            attributes: {
                ...prevInfo.attributes,
                education: newEntries
            }
        }));
    };

    const AddNewEducation = () => {
        setEducationalList([
            ...educationalList,
            {
                universityName: '',
                degree: '',
                major: '',
                startDate: '',
                endDate: '',
                description: ''
            }
        ]);
    };

    const RemoveEducation = () => {
        setEducationalList(educationalList.slice(0, -1));
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                education: educationalList.map(({ id, ...rest }) => rest)
            }
        };

        GlobalApi.UpdateResumeDetail(params.resumeId, data)
            .then(() => {
                setLoading(false);
                toast('Details updated!');
            })
            .catch(() => {
                setLoading(false);
                toast('Server Error, Please try again!');
            });
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add Your educational details</p>

            <div>
                {educationalList.map((item, index) => (
                    <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div className='col-span-2'>
                            <label>University Name</label>
                            <Input
                                name="universityName"
                                value={item.universityName}
                                onChange={(event) => handleChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>Degree</label>
                            <Input
                                name="degree"
                                value={item.degree}
                                onChange={(event) => handleChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>Major</label>
                            <Input
                                name="major"
                                value={item.major}
                                onChange={(event) => handleChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>Start Date</label>
                            <Input
                                type="date"
                                name="startDate"
                                value={item.startDate}
                                onChange={(event) => handleChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>End Date</label>
                            <Input
                                type="date"
                                name="endDate"
                                value={item.endDate}
                                onChange={(event) => handleChange(index, event)}
                            />
                        </div>
                        <div className='col-span-2'>
                            <label>Description</label>
                            <Textarea
                                name="description"
                                value={item.description}
                                onChange={(event) => handleChange(index, event)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
                    <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Education;

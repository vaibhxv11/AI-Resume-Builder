

import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function Skills() {
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [skillsList, setSkillsList] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo?.attributes?.skills) {
            setSkillsList(resumeInfo.attributes.skills);
        }
    }, [resumeInfo]);

    const handleChange = (index, name, value) => {
        const newSkills = [...skillsList];
        newSkills[index] = {
            ...newSkills[index],
            [name]: value
        };
        setSkillsList(newSkills);

        // Update resumeInfo context with the updated skills list
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            attributes: {
                ...prevResumeInfo.attributes,
                skills: newSkills
            }
        }));
    };

    const AddNewSkill = () => {
        setSkillsList([
            ...skillsList,
            {
                name: '',
                rating: 0
            }
        ]);
    };

    const RemoveSkill = () => {
        setSkillsList(skillsList.slice(0, -1));
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                skills: skillsList.map(({ id, ...rest }) => rest)
            }
        };

        GlobalApi.UpdateResumeDetail(resumeId, data)
            .then(resp => {
                setLoading(false);
                toast('Details updated!');
            })
            .catch(error => {
                setLoading(false);
                toast('Server Error, Try again!');
            });
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add your top professional key skills</p>

            <div>
                {skillsList.map((item, index) => (
                    <div key={index} className='flex justify-between mb-2 border rounded-lg p-3'>
                        <div>
                            <label className='text-xs'>Name</label>
                            <Input
                                className="w-full"
                                defaultValue={item.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                        </div>
                        <Rating
                            style={{ maxWidth: 120 }}
                            value={item.rating}
                            onChange={(v) => handleChange(index, 'rating', v)}
                        />
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewSkill} className="text-primary"> + Add More Skill</Button>
                    <Button variant="outline" onClick={RemoveSkill} className="text-primary"> - Remove</Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Skills;

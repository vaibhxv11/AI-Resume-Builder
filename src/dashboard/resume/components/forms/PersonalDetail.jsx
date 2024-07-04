

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

function PersonalDetail({ enableNext }) {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        jobTitle: '',
        address: '',
        phone: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo?.attributes) {
            setFormData({
                firstName: resumeInfo.attributes.firstName || '',
                lastName: resumeInfo.attributes.lastName || '',
                jobTitle: resumeInfo.attributes.jobTitle || '',
                address: resumeInfo.attributes.address || '',
                phone: resumeInfo.attributes.phone || '',
                email: resumeInfo.attributes.email || ''
            });
        }
    }, [resumeInfo]);

    const handleChange = (e) => {
        enableNext(false);
        const { name, value } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: value
        };
        setFormData(updatedFormData);

        setResumeInfo((prevInfo) => ({
            ...prevInfo,
            attributes: {
                ...prevInfo.attributes,
                [name]: value
            }
        }));
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            data: formData
        };
        console.log("data after save:", params?.resumeId);

        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
            // console.log(resp.data);
            enableNext(true);
            setLoading(false);
            toast("Details Updated!");
        }, (error) => {
            setLoading(false);
        });
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-1'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Get Started with the basic information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3 '>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input name="firstName" value={formData.firstName} required onChange={handleChange} />
                    </div>

                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name="lastName" value={formData.lastName} required onChange={handleChange} />
                    </div>

                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name="jobTitle" value={formData.jobTitle} required onChange={handleChange} />
                    </div>

                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input name="address" value={formData.address} required onChange={handleChange} />
                    </div>

                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input name="phone" value={formData.phone} required onChange={handleChange} />
                    </div>

                    <div>
                        <label className='text-sm'>Email</label>
                        <Input name="email" value={formData.email} required onChange={handleChange} />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetail;

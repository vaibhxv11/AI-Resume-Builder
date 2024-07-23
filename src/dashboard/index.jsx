import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from '../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  // Used to get the user's resume list
  const GetResumesList = () => {
    setIsLoading(true);
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(resp => {
      setResumeList(resp.data.data);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating Resume for your next job role</p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume />
        {isLoading ? (
          [1, 2, 3, 4].map((item, index) => (
            <div
              key={index}
              className='h-[280px] rounded-lg bg-slate-200 animate-pulse'
            ></div>
          ))
        ) : (
          resumeList.length > 0 ? (
            resumeList.map((resume, index) => (
              <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
            ))
          ) : null
        )}
      </div>
    </div>
  );
}

export default Dashboard;

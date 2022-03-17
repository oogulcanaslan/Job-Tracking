import * as React from 'react';

import "./JobList.scss"


import { useSelector, useDispatch } from 'react-redux';
import { getJobListAsync } from '../../Redux/joblistSlice';
import { useEffect } from 'react';


import JobItem from '../JobItem/JobItem';




const JobList = ({ priority, search }) => {

  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getJobListAsync());
   


  }, [dispatch]);

  // const [editJobName,setEditJobName]=useState("");
  // const [editPriority,setEditPriority]=useState("");



 



  return (
    <>

      <div className="tableContainer" >

            {
              
              jobs
              .filter(x => x.category.includes(priority))
                .filter(jobName => jobName.title.includes(search))
                .map((job, index) => (
               
                      <JobItem id={job._id} key={job._id} title={job.title} category={job.category} />
                   
                ))
            }

      </div>




    </>

  );
}
export default JobList;
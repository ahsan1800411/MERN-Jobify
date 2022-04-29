/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAppContext } from '../context/AppContext';
import Loading from './Loading';
import Job from './Job';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
  const {
    jobs,
    getJobs,
    totalJobs,
    page,
    isLoading,
    searchType,
    searchStatus,
    search,
    sort,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getJobs();
  }, [searchType, searchStatus, search, sort, page]);
  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return <h2>No jobs to display......</h2>;
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;

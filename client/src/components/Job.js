import React from 'react';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import moment from 'moment';
import JobInfo from './JobInfo';
import { useAppContext } from '../context/AppContext';

const Job = ({
  company,
  createdAt,
  _id,
  position,
  jobLocation,
  status,
  jobType,
}) => {
  let date = moment(createdAt);
  date = date.format('MMM Do YY');
  const { setEditJob, deleteJob } = useAppContext();
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        {/* content center later */}
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              className='btn edit-btn'
              onClick={() => setEditJob(_id)}
              to='/add-job'
            >
              Edit
            </Link>
            <button
              className='btn delete-btn'
              type='button'
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;

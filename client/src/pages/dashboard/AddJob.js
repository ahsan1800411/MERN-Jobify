import React from 'react';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { Alert, FormRow, FormRowSelect } from '../../components';
import { useAppContext } from '../../context/AppContext';

const AddJob = () => {
  const {
    isEditing,
    showAlert,
    position,
    company,
    jobType,
    displayAlert,
    jobLocation,
    jobTypeOptions,
    status,
    handleChange,
    statusOptions,
    clearValues,
    createJob,
    editJob,
    isLoading,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company || !position || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }

    createJob();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit a job' : 'Add a Job'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            handleChange={handleJobInput}
            value={position}
          />
          <FormRow
            type='text'
            name='company'
            handleChange={handleJobInput}
            value={company}
          />
          <FormRow
            type='text'
            labelText='location'
            name='jobLocation'
            handleChange={handleJobInput}
            value={jobLocation}
          />
          {/* status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            handleChange={handleJobInput}
            list={jobTypeOptions}
            name='jobType'
            labelText='job type'
            value={jobType}
          />

          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;

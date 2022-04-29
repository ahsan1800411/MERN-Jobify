import React from 'react';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useAppContext } from '../context/AppContext';
import { FormRow } from './FormRow';
import FormRowSelect from './FormRowSelect';

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    statusOptions,
    jobTypeOptions,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          <FormRow
            type='text'
            name='search'
            handleChange={handleSearch}
            value={search}
          />
          <FormRowSelect
            handleChange={handleSearch}
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            list={['all', ...statusOptions]}
          />
          <FormRowSelect
            handleChange={handleSearch}
            labelText='type'
            name='searchType'
            value={searchType}
            list={['all', ...jobTypeOptions]}
          />
          <FormRowSelect
            handleChange={handleSearch}
            name='sort'
            value={sort}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;

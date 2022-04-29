import React from 'react';

export const FormRow = ({ name, labelText, value, handleChange, type }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        className='form-input'
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
};

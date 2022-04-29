import React, { useState } from 'react';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useAppContext } from '../../context/AppContext';
import { Alert } from './../../components/Alert';
import { FormRow } from './../../components/FormRow';

const Profile = () => {
  const { displayAlert, showAlert, user, updateUser, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);
  const [lastName, setLastName] = useState(user?.lastName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || lastName || location) {
      displayAlert();
      return;
    }
    updateUser({ name, email, location, lastName });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className='form'>
        <h3>profile</h3>
        {showAlert && <Alert />}

        <div className='form-center'>
          <FormRow
            labelText='Name'
            handleChange={(e) => setName(e.target.value)}
            name='name'
            type='text'
            value={name}
          />
          <FormRow
            labelText='Email'
            handleChange={(e) => setEmail(e.target.value)}
            name='email'
            type='email'
            value={email}
          />
          <FormRow
            labelText='Location'
            handleChange={(e) => setLocation(e.target.value)}
            name='location'
            type='text'
            value={location}
          />
          <FormRow
            labelText='Last Name'
            handleChange={(e) => setLastName(e.target.value)}
            name='lastName'
            type='text'
            value={lastName}
          />

          <button className='btn btn-block' disabled={isLoading} type='submit'>
            {isLoading ? 'Please wait ....' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;

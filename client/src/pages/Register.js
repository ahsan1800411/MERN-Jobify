import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Alert, FormRow, Logo } from '../components';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

export const Register = () => {
  const [values, setValues] = useState(initialState);
  const { showAlert, displayAlert, isLoading, setupUser, user } =
    useAppContext();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };

    if (isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successfully. Redirecting....',
      });
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'Resgister Successfully. Redirecting....',
      });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [navigate, user]);

  return (
    <Wrapper className='full-page'>
      <form onSubmit={handleSubmit} className='form'>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            name='name'
            value={values.name}
            type='text'
            labelText='Name'
            handleChange={handleChange}
          />
        )}
        <FormRow
          name='email'
          value={values.email}
          type='email'
          labelText='Email'
          handleChange={handleChange}
        />
        <FormRow
          name='password'
          value={values.password}
          type='password'
          labelText='Password'
          handleChange={handleChange}
        />

        <button className='btn btn-block' type='submit' disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button className='member-btn' type='button' onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

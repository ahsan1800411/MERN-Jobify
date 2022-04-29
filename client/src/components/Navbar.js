import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaCaretDown, FaUserCircle } from 'react-icons/fa';
import Logo from './Logo';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, user, logoutUser } = useAppContext();

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button type='button' className='dropdown-btn' onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;

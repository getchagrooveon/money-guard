import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <nav>
        <NavLink to={'/register'}>Register</NavLink>
        <NavLink to={'/login'}>Login</NavLink>
        <NavLink to={'/dashboard'}>Dashboard</NavLink>
        <NavLink to={'/home'}>Home</NavLink>
        <NavLink to={'/statistics'}>Statistics</NavLink>
        <NavLink to={'/currency'}>Currency</NavLink>
      </nav>
    </div>
  );
};

export default NavBar;

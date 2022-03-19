import React from 'react';
import classes from './header.module.scss';
import logo from '../../images/Logo.png'

const Header = () => (
  <header className={classes.header}>
    <img src={logo} alt='logo'/>
  </header>
);

export default Header;
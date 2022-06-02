import logo from '../../assets/images/logo.png';
import './Header.scss';

import { memo } from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo_title">
        <img className="header__logo" src={logo} alt="logo" />
        <h4 className="header__title">ToDo Online</h4>
      </div>
      <h4 className="header__author">Jurijs Belozjorovs</h4>
    </header>
  );
};

export default memo(Header);

import React from 'react';

import './style.scss';
import logo from '../../assets/images/Marvel-Comics-Logo.png';

const Header: React.FC = (): JSX.Element => {
    return (
        <div className="header">
            <a href="/">
                <img src={logo} alt="Marvel" className="search-page-logo" />
            </a>
        </div>
    )
}

export default Header
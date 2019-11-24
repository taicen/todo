import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import uuid from 'uuid/v1';
import {ReactComponent as Logo} from '../../assets/icons/logo.svg'

import './header.scss';

const Header = ({links, ...props}) => {
  const renderTreeMenu = (data) => {
    return(
      <ul className="b-navbar">
        {
          data.map((dataVal,ind)=>{
          let child = dataVal.children && dataVal.children.length > 0 ? true: null;
          return(
            <li key={uuid()}>
              <Link to={dataVal.to}>{dataVal.name}</Link>
              {child && <span className="is-caret"></span>}
              {child && renderTreeMenu(dataVal.children)}
            </li>
            )
          })
        }
      </ul>
    )
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.setItem('token', '');
    localStorage.setItem('role', 'user');
    localStorage.setItem('timetoken', null);
    props.history.go('/');
  }

  return (
    <div className="b-header is-container-row is-center is-items-middle">
      <div className="b-brand is-20">
        <Logo/>
      </div>
      <nav className="b-navbar-wrap">
        { renderTreeMenu(links) }
      </nav>
      <div className="b-button-wrap">
        {
          (localStorage.getItem('token')) ? 
          <Link to="#" onClick={(e) => logout(e)} className="b-button is-secondary"><span>Logout</span></Link>
          : <Link to="/login" className="b-button is-secondary"><span>Login</span></Link>
        }      
      </div>
    </div>
  );
};

export default withRouter(Header);
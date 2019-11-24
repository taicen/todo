import React from 'react';
import { withRouter, Link } from 'react-router-dom'
// import uuid from 'uuid/v1';
import {ReactComponent as Logo} from '../../assets/icons/logo.svg'
import {ReactComponent as Twitter} from '../../assets/icons/tw.svg'
import {ReactComponent as Facebook} from '../../assets/icons/fb.svg'
import {ReactComponent as Instagram} from '../../assets/icons/in.svg'

import './footer.scss';

const Footer = () => {
  let navLinks = [
    {
      to: '/',
      name: 'About Us'
    },
    {
      to: '/',
      name: 'News'
    },
    {
      to: '/',
      name: 'Support'
    },
    {
      to: '/',
      name: 'Products'
    }
  ];
  let aboutLinks = [
    {
      to: '/',
      name: 'Who we are'
    },
    {
      to: '/',
      name: 'Our team'
    },
    {
      to: '/',
      name: 'Careers'
    },
    {
      to: '/',
      name: 'Investors'
    }
  ];
  let supportLinks = [
    {
      to: '/',
      name: 'Documentation'
    },
    {
      to: '/',
      name: 'Community'
    },
    {
      to: '/',
      name: 'Get in Touch'
    }
  ];
  const renderListLinks = (data) => {
    return(
      <ul className="b-links">
        {data.map((item, idx)=>{
          return(
            <li key={idx}><Link to={item.to}>{item.name}</Link></li>
          )
        })}
      </ul>
    )
  }
  return(
    <footer>
    <div className="b-footer is-center is-width-medium">
      <div className="b-brand">
        <Logo/>
        <div>
          Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam eget nullam pellentesque aliquam curabitur cociis.
        </div>
      </div>
      <div className="b-unit-wrap">
        <dl className="b-unit">
          <dt>Navigation</dt>
          <dd>
            {renderListLinks(navLinks)}
          </dd>
        </dl>
        <dl className="b-unit">
          <dt>About us</dt>
          <dd>
            {renderListLinks(aboutLinks)}
          </dd>
        </dl>
        <dl className="b-unit">
          <dt>Support</dt>
          <dd>
            {renderListLinks(supportLinks)}
          </dd>
        </dl>
        <dl className="b-unit">
          <dt>Subscribe to our newsletter</dt>
          <dd>
            <p>Receive our latest news and promotions in your inbox!</p>
            <input type="text"/>
          </dd>
        </dl>
      </div>
    </div>
    <div className="b-footer-bottom is-center is-width-medium">
      <div>Copyright © 2018 Toxin UI Kit. All rights reserved.</div>
      <div>
        <span><Twitter/></span>
        <span><Facebook/></span>
        <span><Instagram/></span>
      </div>
    </div>
    </footer>
  )
}

export default withRouter(Footer);
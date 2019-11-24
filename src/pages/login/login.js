import React, { Component } from 'react';
import AnimLayout from '../../common/anim-layout'
import Layout from '../../common/layout'

import * as api from '../../utils/api';

class LoginPage extends Component {
  state = {
    error: {},
  }

  getAuth = (e) => {
    e.preventDefault();
    let nowDate = new Date();
    let cancelDate = new Date(nowDate.getTime() + (24 * 3600 * 1000));

    let formData = new FormData(document.forms.formAuth);
    api.authApp( formData ).then((res)=>{
      if(res.status==='error'){
        this.setState({error: res.message})
      } else {
        alert('Вы успешно авторизованы!');
        localStorage.setItem('token', res.message.token);
        localStorage.setItem('timetoken', cancelDate);
        localStorage.setItem('role', formData.get('username') === 'admin' ? 'admin' : 'user');
        this.props.history.push('/');
      }
    });
  }

  render(){
    return(
      <Layout>
        <AnimLayout>
          <section className="screen-splash">
            <div className="b-main">
              <form name="formAuth" className="b-login-form">
                
                <div className="b-form-field">
                  <label>
                    Login
                    {(this.state.error.username) ?
                    <div className="b-form-error">{this.state.error.username}</div> : null}
                    <input type="text" name="username"/>
                  </label>
                </div>
                <div className="b-form-field">
                  <label>
                    Password
                    {(this.state.error.password) ?
                    <div className="b-form-error">{this.state.error.password}</div> : null}
                    <input type="password" name="password"/>
                  </label>
                </div>
                <div className="b-form-field-btn">
                  <button className="b-button is-primary" onClick={(e)=>{ this.getAuth(e) }}><span>Sign in</span></button>
                </div>
              </form>
            </div>
          </section>
        </AnimLayout>
      </Layout>
    )
  }
}

export default LoginPage;
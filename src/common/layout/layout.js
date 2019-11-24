import React, { Component } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'

class Layout extends Component {
  state = {
    links: [
      {
        to: '/',
        name: 'Home'
      },
    ]
  }
  render() {
    return (
      <div className="app">
        <header>
          <Header links={this.state.links}/>
        </header>
        <section className="content">
          { this.props.children }
        </section>
        
        <Footer/>
        
      </div>
    );
  }
}

export default Layout;
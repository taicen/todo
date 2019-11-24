import React from 'react'
import {Link} from 'react-router-dom'
import AnimLayout from '../../common/anim-layout'

import './not-found.sass'

const NotFoundPage = () => {
  return (
    <AnimLayout>
      <h1>404 Not Found</h1>
      <div>
        <Link to="/" >Home page</Link>
      </div>
    </AnimLayout>
  )
}

export default NotFoundPage

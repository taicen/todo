import React, {Fragment} from 'react'
import Fade from 'react-reveal/Fade'

const AnimLayout = ({component: Tag, children, ...props}) => {
  const Component = (typeof Tag === 'function') ? Tag : Fade;
  return <Component {...props}><Fragment>{children}</Fragment></Component>;
}

export default AnimLayout
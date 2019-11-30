import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ButtonGroup = ({children, className, ...props}) => {
  const classes = classNames(
    'button-group',
    className
  );

  return (
    <div className={classes} {...props}>
      { children }
    </div>
  )
}

ButtonGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

ButtonGroup.defaultProps = {
  children: null,
  className: '',
};

export default ButtonGroup;
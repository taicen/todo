import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const RadioButton = ({value, id, name, className, label, ...props}) => {
  const classes = classNames(
    'btn',
    className
  );

  return (
    <Fragment>
      <input type="radio" name={name} value={value} id={id} {...props}/>
      <label className={classes} htmlFor={id}>{ label }</label>
    </Fragment>
  )
}

RadioButton.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string
};

RadioButton.defaultProps = {
  value: '',
  className: '',
  name: '',
  id: '',
  label: ''
};

export default RadioButton;
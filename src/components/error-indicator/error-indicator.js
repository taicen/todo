import React from 'react';
import './error-indicator.sass';
import icon from './explosion.png';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={icon} className="boom-planet" alt="error planet"/>
      <span className="boom">Boom!</span>
      <span className="clause">Что-то пошло не так...</span>
      <span className="clause">Мы уже в пути чтобы устранить неполадку!</span>
    </div>
  )
}

export default ErrorIndicator;
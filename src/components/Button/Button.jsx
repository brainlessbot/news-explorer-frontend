import React from 'react';
import classNames from 'classnames';
import './Button.css';

/**
 * Button component.
 *
 * @component
 * @param {React.ReactNode} children
 * @param {string} pattern
 * @param {Object} props
 * @return {React.ReactNode}
 */
const Button = ({ children, pattern, ...props }) => (
  <button
    {...props}
    className={classNames(
      'button',
      `button_${pattern}`,
      props.className,
    )}
  >
    {children}
  </button>
);

export default Button;

import React from 'react';
import PropTypes from 'prop-types';


const Checkbox = (props) => (
  <div className='checkboxContainer'>
    <input 
      type='checkbox'
      name={props.name} 
      className='checkboxInput'
      id={props.id}
      onChange={props.onChange} />
    <label htmlFor={props.id}>
      <svg className='checkbox' viewBox="0 0 22 22">
        <circle 
          cx='11'
          cy='11'
          r='12'
        />
        <polyline points="3,11 9,17 18,5" />
      </svg>
    </label>
  </div>  
);

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
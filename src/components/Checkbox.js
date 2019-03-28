import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Checkbox extends Component {
  state={
   checked: false
  }

  handleClick = (event) => {
    
    this.setState({
      checked: event.target.checked
    });
  
    this.props.onChange(event);
  }

  render() {
    const { id, name } = this.props;
    const { checked } = this.state;
    return(
      <div className={`checkboxContainer ${checked ? 'checked' : 'unchecked'}`}>
      <input 
        type='checkbox'
        name={name} 
        className={`checkboxInput ${checked ? 'checked' : 'unchecked'}`}
        id={id}
        onClick={this.handleClick} 
      />
      <label htmlFor={id}>
        <svg className='checkbox' viewBox="0 0 22 22">
          <circle 
            cx='11'
            cy='11'
            r='12'
          />
          <polyline points="3,11 9,17 18,5" stroke="#f7f7f7" />
        </svg>
      </label>
    </div> 
    )
  } 
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
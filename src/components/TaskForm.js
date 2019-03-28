import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as PlusSVG } from '../add.svg';


class TaskForm extends Component {
  state = {
    input: false,
    focus: false,
  };
 
  handleChange = (event) => {
    this.props.handleChange(event);
    this.setState({
      input: true
    });
  }

  handleBlur = () => {
    this.setState({
      input: false,
      focus: false,
    });
  }

  handleFocus = () => {
    this.setState({
      focus: true
    });
  }
 
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitTask();
    this.setState({
      input: false,
    });
  }

  render(){  
    const { taskContent } = this.props;
    const { input, focus } = this.state;
    return(
      <form 
        onSubmit={this.handleSubmit} 
        id='addTask'
        className={`addTaskContainer ${focus ? 'inFocus' : ''}`}>
        <PlusSVG className='image' />
        <input 
          className={`taskInput ${ input ? ' active' : '' } `}
          type='text'  
          placeholder='Add new task' 
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          value={taskContent} 
          required
          />
        <button className={`addTaskButton ${focus ? 'inFocus' : ''}`} type='submit'>
          Add
        </button>
      </form>
    );
  }
}

TaskForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  submitTask: PropTypes.func.isRequired,
  taskContent: PropTypes.string.isRequired,
};

export default TaskForm;
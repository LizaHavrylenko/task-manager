import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as PlusSVG } from '../add.svg';


class TaskForm extends Component {
  state = {
    input: false,
  };
 
  handleChange = (event) => {
    this.props.handleChange(event);
    this.setState({
      input: true
    });
  }

  handleBlur = () => {
    this.setState({
      input: false
    });
  }
 
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.manageTask();
    this.setState({
      input: false,
    });
  }

  render(){  
    const { taskContent } = this.props;
    const { input } = this.state;
    return(
        <form onSubmit={this.handleSubmit} id='addTask' className='addTaskContainer'>
        <PlusSVG className='image' />
        <input 
          className={input ? 'taskInput active' : 'taskInput'}
          type='text'  
          placeholder='Add new task' 
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={taskContent} 
          required
          />
        <button className='addTaskButton' type='submit'>
          Add
        </button>
        </form>
    );
  }
}

TaskForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  taskContent: PropTypes.string.isRequired,
};

export default TaskForm;
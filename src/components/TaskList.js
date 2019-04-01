import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';


class TaskContainer extends Component {
 
  handleChange = (event) => {
    event.stopPropagation();
    this.props.handleCheckboxChange(event.target);   
  }

  render() {
    const { tasks } = this.props;
    const dateOptions = {year: 'numeric', month: 'short', day: 'numeric'}; 
    const dateContent = new Date().toLocaleDateString('en-US', dateOptions)
    return(
      <div className='taskList'>
        {tasks.map(task => (
          <div 
            className='task' 
            id='taskContainer' 
            key={task.id}
          >
            <Checkbox 
              name={task.value}
              id={task.id} 
              onChange={this.handleChange}
            />
            <p className='taskContent' id={task.value}> 
              {task.value}
            </p>
            <span className='timestamp'>{dateContent}</span>
          </div>
        ))}
      </div> 
    );
  }
};

TaskContainer.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  tasks : PropTypes.array.isRequired,
};

export default TaskContainer;

 
 
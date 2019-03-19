import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../components/Checkbox';


class TaskContainer extends Component {
 
  handleChange = (event) => {
    event.stopPropagation();
    const checkedState = event.target.checked;
    const taskText = document.getElementById(event.target.name);
    this.props.handleCheckboxChange(event.target);
    this.toggleStyle(checkedState, taskText);
    this.toggleTimestamp(checkedState, taskText);
  }

  toggleStyle = (checked, task) => {
    if(checked) {
      task.classList.add('checked');
    } else {
      task.classList.remove('checked');
    }
  }

  toggleTimestamp = (checked, task) => {
    const timestamp = document.createElement('span');
    timestamp.setAttribute('class', 'timestamp');
    const dateOptions = {year: 'numeric', month: 'short', day: 'numeric'};
    timestamp.innerHTML = new Date().toLocaleDateString('en-US', dateOptions);
    if(checked){
      task.insertAdjacentElement('afterend', timestamp);
    } else{
      if(task.nextElementSibling){
        task.nextElementSibling.remove();
      }
    }
  }
  
  render() {
    const { tasks } = this.props; 
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
          </div>
        ))}
      </div> 
    );
  }
}

TaskContainer.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  tasks : PropTypes.array.isRequired,
};

export default TaskContainer;

 
 
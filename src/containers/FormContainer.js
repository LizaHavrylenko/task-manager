import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';
import { storage } from '../index.js';
import TaskForm from '../components/TaskForm';


class FormContainer extends Component {
    state = {
        taskContent: '',
    };

    handleInputChange = (event) => {
      this.setState({
        taskContent: event.target.value
      });
    };

    submitTask = () => {
       const storageList = JSON.parse(storage.getItem('tasks'));
        if(!('tasks' in storage)){
          storage.setItem('tasks', JSON.stringify([]));
        } 
        const newTask = {
          id: uuidv4(),
          value: this.state.taskContent,
          timer: ''
        };  
        for(let task of storageList) {
          if(task.value === newTask.value) {
            alert('This task already exists. Please, choose another one.');
            this.setState({
              taskContent: '',
            })
            return; 
          }
        }
        this.setState({
          taskContent: '',
        })
        this.props.displayTask(newTask);
    };

    render() {
        const { taskContent } =this.state;
        return(
            <TaskForm 
              handleChange={this.handleInputChange}
              taskContent={taskContent}
              submitTask={this.submitTask}
            />
        )
    }
}

FormContainer.propTypes = {
    displayTask: PropTypes.func.isRequired,
};

export default FormContainer;
import React, { Fragment, Component } from 'react';
import uuidv4 from 'uuid/v4';
import { storage } from '../index.js';
import TaskForm from './TaskForm';
import TaskContainer from './TaskContainer.js';


class ManageTasks extends Component{
    state = {
      taskContent: '',
      list: [],
      checkedTasks: new Map(),
    };
  
  componentDidMount() {
    if('tasks' in storage){
      this.setState({
        list: JSON.parse(storage.getItem('tasks'))
      });
    }
    window.addEventListener('beforeunload', this.removeCheckedTasks);   
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.removeCheckedTasks);
  }
  
  deleteFromStorage = (changedTask) => {
    const filteredList = JSON.parse(storage.getItem('tasks'))
      .filter(item => item.value !== changedTask);
    storage.setItem('tasks', JSON.stringify(filteredList));
  }

  removeCheckedTasks = () => {
    const  { checkedTasks } = this.state;
    checkedTasks.forEach((value, key) => {
      if(value === true){
        return this.deleteFromStorage(key); 
      }
    }); 
  }

  findFirstCheckedItem = () => {
    const { list, checkedTasks } = this.state;
    for(let task of list) {
      if(checkedTasks.get(task.value)){
        return task;
      }
    }
  }

  handleCheckboxChange = (element) => {
    const { 
      name:task,
      checked,
      id 
    } = element;
    const { list:listInState } = this.state;
    const taskIndex = listInState.findIndex(item => item.id === id);
    const newTask = listInState[taskIndex];
    const checkedTask = this.findFirstCheckedItem();
    const index = checkedTask ? listInState.indexOf(checkedTask) : listInState.length;
      
    if(element !== null && checked) {
      const timeout = setTimeout(() => {
        this.deleteFromStorage(task);
        this.setState({
          list: JSON.parse(storage.getItem('tasks'))
        });
      }, 60000);
      
      newTask.timer = timeout;

      const newList = [...listInState.slice(0, taskIndex), ...listInState.slice(taskIndex + 1,
        index), newTask, ...listInState.slice(index)];   
      this.setState({
        list: newList
      });  
    } else{
      clearTimeout(newTask.timer);   
    } 

    this.setState(prevState => ({ 
      checkedTasks: prevState.checkedTasks.set(task, checked) }));  
  }
 
  handleFormChange = (event) => {
    this.setState({
      taskContent: event.target.value
    });
  }

  manageTask = () => {
    const storageList = JSON.parse(storage.getItem('tasks'));
    const { list } = this.state;

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
    storageList.push(newTask);
    storage.setItem('tasks', JSON.stringify(storageList));
    const checkedTask = this.findFirstCheckedItem();
    const index =  checkedTask ? list.indexOf(checkedTask) : list.length;
    const newList = [...list.slice(0, index), newTask, ...list.slice(index)];                   
    this.setState({
      list: newList,
      taskContent: ''
    });
  }
 
  render(){
    const { list,  taskContent } = this.state;
    return(
      <Fragment>
        <TaskForm 
          manageTask={this.manageTask}
          handleMouseDown={this.handleMouseDown}
          handleChange={this.handleFormChange}
          taskContent={taskContent}
        />
        <TaskContainer 
          tasks={list}
          handleCheckboxChange={this.handleCheckboxChange} 
        />
      </Fragment>
    );
  }
}

export default ManageTasks;
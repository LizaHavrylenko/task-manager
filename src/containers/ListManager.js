import React, { Component, Fragment } from 'react';
import { storage } from '../index.js';
import TaskList from '../components/TaskList';
import FormContainer from './FormContainer';


class ManageTasks extends Component {
    state = {
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

  setStateAndStorage = (list) => {
    this.setState({
      list,
    });
    storage.setItem('tasks', JSON.stringify(list));
  }
 
  removeCheckedTasks = () => {
    const { checkedTasks, list } = this.state;
    const newList = list.filter(item => !checkedTasks.get(item.value));
    this.setStateAndStorage(newList);
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
     const checkbox = element;
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
    let newList = listInState;
    if(checked) { 
      newTask.timer = setTimeout(() => {
        const filteredList =  listInState.filter(item => item.value !== task);
        this.setStateAndStorage(filteredList);
      }, 60000);
        if(taskIndex === listInState.length -1) {
          newList = listInState;
        } else {
          newList = [...listInState.slice(0, taskIndex), ...listInState.slice(taskIndex + 1, index), newTask,
          ...listInState.slice(index)]; 
        } 
    } else if (element !== null) {
      clearTimeout(newTask.timer); 
      if(taskIndex > index) {
        newList = [...listInState.slice(0, index), newTask, ...listInState.slice(index, taskIndex), 
        ...listInState.slice(taskIndex + 1),]
      }
    } 
   
    setTimeout(() => {
      checkbox.classList.add('noAnimate');
      this.setState({
        list: newList
      });  
      this.setState(prevState => ({ 
        checkedTasks: prevState.checkedTasks.set(task, checked)})); 
    }, 2000);    
  }

  displayTask = (task) => {
    const { list } = this.state;
    const checkedTask = this.findFirstCheckedItem();
    const index =  checkedTask ? list.indexOf(checkedTask) : list.length;
    const newList = [...list.slice(0, index), task, ...list.slice(index)];   
    this.setStateAndStorage(newList);
  }
 
  render(){
    const { list } = this.state;
    return(
      <Fragment>
        <FormContainer displayTask={this.displayTask} />
        <TaskList 
          tasks={list}
          handleCheckboxChange={this.handleCheckboxChange} 
        />
      </Fragment>
    );
  }
}

export default ManageTasks;
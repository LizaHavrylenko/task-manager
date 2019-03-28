import React, { Component } from 'react';
import { Header } from './components/Header';
import ListManager from './containers/ListManager';
 
 
class App extends Component {
  render() {
    return (
      <div className='managerContainer'>
        <Header content='Task Manager' type='outerHeader' />
        <div className = 'listContainer'>
          <Header content='Work' type='innerHeader' />
          <ListManager />
        </div> 
      </div>
    );
  }
}

export default App;

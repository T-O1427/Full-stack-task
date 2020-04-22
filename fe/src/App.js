import React from 'react';
import './external/bootstrap.min.css';
import './App.css';
import UserComponent from './components/user.Component';

function App() {
  return (
    <div className="App container-fluid">
          <div className={'row'}>
                  <header className="App-header">
                      
                  </header>
          </div>

        <UserComponent></UserComponent>
    </div>
  );
}

export default App;

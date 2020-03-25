import React from 'react';
import './App.css';
import UserComponent from './components/user.Component';
import './external/bootstrap.min.css';

function App() {
  return (
    <div className="App container-fluid">
      {/*<header className="App-header">*/}
      {/*    <h1>Nova Futur React App</h1>*/}
      {/*</header>*/}

        <h2><em>Welcome to the album library</em></h2>
        <UserComponent></UserComponent>
    </div>
  );
}

export default App;

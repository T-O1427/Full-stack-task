import React from 'react';
import './external/bootstrap.min.css';
import './App.css';
import UserComponent from './components/user.Component';

function App() {
  return (
    <div className="App container-fluid">
          <div className={'row'}>
                  <header className="App-header">
                      <img
                          src="https://uploads-ssl.webflow.com/5d8cbad86fd5bf258c87353e/5d8df17dc33e99853e136009_novafutur_novafutur_Horizontal_noTag_BW.svg"
                          alt="" className="welcomelogo"/>
                  </header>
          </div>

        <UserComponent></UserComponent>
    </div>
  );
}

export default App;

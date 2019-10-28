import React from 'react';
import logo from './logo.svg';
import './App.scss';
import SplashPage from './views/splashPage/splashPage';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fab)


function App() {
  return (
    <div className="App">
      <SplashPage />
    </div>
  );
}

export default App;

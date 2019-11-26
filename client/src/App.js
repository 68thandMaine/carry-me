import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import Routes from './routes/Routes';
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);


function App() {
  return (
    <div className="App">
     <Router>
       <Routes />
     </Router>
    </div>
  );
}

export default App;

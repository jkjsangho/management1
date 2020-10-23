import React from 'react';
import { 
  HashRouter,
  Route,
} from "react-router-dom";
import Home from "./routes/Home";
import Navigation from "./components/Navigation";
import About from "./routes/About";
import menu1 from "./routes/menu1.js";
import './App.css';
//import CustomerAdd from './components/CustomerAdd';


function App(){
  return(
    <HashRouter>
      <Navigation />
      <Route path="/" exact={true} component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/menu1" component={menu1}/>
      {/* <Route path="/movie-detail" component={Detail}/> */}
    </HashRouter>
  );
}

export default App;
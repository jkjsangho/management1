import React from 'react';
import { 
  HashRouter,
  Route,
} from "react-router-dom";
import Home from "./routes/Home";
import Navigation from "./components/Navigation";
import About from "./routes/About";
import menu1 from "./routes/menu1.js";
import menu2 from "./routes/menu2.js";
import Device_Info from "./routes/Device_Info.js";
import './App.css';
//import CustomerAdd from './components/CustomerAdd';


function App(){
  return(
    <HashRouter>
      <Route path="/" exact={true} component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/menu1" component={menu1}/>
      <Route path="/menu2" component={menu2}/>
      <Route path="/Device_Info" component={Device_Info}/>
      <Navigation />
      {/* <Route path="/movie-detail" component={Detail}/> */}
    </HashRouter>
  );
}

export default App;
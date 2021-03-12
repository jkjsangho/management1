import React from 'react';
import { 
  HashRouter,
  Route
} from "react-router-dom";
import Home from "./routes/Home";
/* import Navigation from "./components/Navigation"; */
import About from "./routes/About";
import menu1 from "./routes/menu1";
import menu2 from "./routes/menu2";
import userinfo from "./routes/userinfo";
import countlog from "./routes/countInfo2";
import serialnum from "./routes/serialnum";
import blacklist from "./routes/blacklist";
import recog from "./routes/recog";
import settings from "./routes/settings";
import upgrade from "./routes/upgrade";
import user from "./routes/user";
import user2 from "./routes/user2";
import modal from "./routes/modalpage";
import './App.css';
//import CustomerAdd from './components/CustomerAdd';


function App(){
  return(
    <HashRouter>
      <Route path="/" exact={true} component={userinfo}/>
      <Route path="/about" component={About}/>
      <Route path="/menu1" component={menu1}/>
      <Route path="/menu2" component={menu2}/>
      <Route path="/deviceinfo" component={userinfo}/>
      <Route path="/countlog" component={countlog}/>
      <Route path="/serialnum" component={serialnum}/>
      <Route path="/blacklist" component={blacklist}/>
      <Route path="/recog" component={recog}/>
      <Route path="/settings" component={settings}/>
      <Route path="/upgrade" component={upgrade}/>
      <Route path="/user" component={user}/>
      <Route path="/user2" component={user2}/>
      {/* <Navigation /> */}
      {/* <Route path="/movie-detail" component={Detail}/> */}
    </HashRouter>
  );
}

export default App;
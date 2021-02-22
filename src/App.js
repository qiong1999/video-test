import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import "./App.css";

import Join from "./page/joinVideo/joinVideo"
import Login from "./page/login/Login";
import Meeting from "./page/meeting/meeting"
function App() {
  let [state,setState] = useState({})
  let history = useHistory()
  useEffect(()=>{
    if(state.state==='create') history.push("/meeting")
    if(state.state==='join' ) history.push("/join")
  },[state])
  return (
    <>
      <Link to ="/"></Link>
      <Link to="/join"></Link>
      <Link to = "/meeting"></Link>
      <Switch>
      <Route  exact path = "/">
        <Login handleClick={(e)=>{setState(e);}}></Login>
      </Route>
      <Router path="/join"> 
      <Join></Join>
      </Router>
      <Router path="/meeting">
        <Meeting user={state.user}></Meeting>
      </Router>
      </Switch>
    </>
  );
}

export default App;

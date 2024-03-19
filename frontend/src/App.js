import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NoteState from './context/notes/NoteState';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import React, {useState} from 'react'
import Alert from './components/Alert';
import AddNote from './components/AddNote';

function App() {
  const [alert, setAlert]= useState(null);

  const showAlert=(message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <Alert alert={alert}/>
          <div className="container">
            <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact  path="/" >
              <Home showAlert={showAlert}/>
            </Route>
            <Route exact path="/login">
              <Login showAlert={showAlert}/>
            </Route>
            <Route exact  path="/register">
              <Register showAlert={showAlert}/>
            </Route>
            <Route exact  path="/newnote">
              <AddNote showAlert={showAlert}/>
            </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

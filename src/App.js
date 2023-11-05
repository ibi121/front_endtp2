import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Acceuil from './Component/Acceuil';
import NavBar from './Component/NavBar';
import Calendrier from './Component/Calendrier';
import Axios from 'axios';
import Signin from './Component/Signin';
import { Container } from 'react-bootstrap';
import Signup from './Component/Signup';
// import React, { useState } from 'react'
import { useState, useEffect } from 'react';


function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    Axios.get("https://backend-tp2-web-ih-rm-d79a75ee3069.herokuapp.com/signin")
    .catch((error) => {
      return;
    })
    .then((response) => {
      if(response.data.isConnected === true) {
        setLoggedIn(true)
        setUser(response.data.utilisateur)
      }
    })

  }, [])


  return (
    <Container fluid>

      <BrowserRouter>
      <NavBar 
      isConnected ={isLoggedIn}
      onClick={value => {setLoggedIn(value)}}
      />
      <Routes>

      <Route exact path='/' element={<Acceuil isLoggedIn={isLoggedIn} utilisateur={user} />}/>
        <Route exact path='/Signin' element={<Signin onClick={value => {setLoggedIn(value)}} />}/>
        <Route exact path='/Signup' element={<Signup />}/>

        {isLoggedIn? 
        <Route exact path='/Calendrier' element={<Calendrier user={user} isLoggedIn={isLoggedIn}/>} />
        :
        <Route exact path='/Calendrier' element={<Navigate replace to={"/"}/>}/>
        }
       
      </Routes>
      
      </BrowserRouter>

    </Container>
  );
}

export default App;

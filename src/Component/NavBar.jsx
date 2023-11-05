import React from 'react'
import {Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Axios from 'axios'


export default function NavBar(props) {

    const handleLogout = () => {
        Axios.get("https://backend-tp2-web-ih-rm-d79a75ee3069.herokuapp.com/deconnection")
        .catch((error)=> {
            if(error){
                return;
            }
        })
        .then((response)=> {
            if(response){
                props.onClick(false);
            }
        })
    }


  return (
    <div>
    <Navbar  bg="primary" data-bs-theme="dark">
        <Container fluid>
            <Navbar.Toggle aria-controls="basic-nav-bar"></Navbar.Toggle>
            <Navbar.Collapse id="basiv-nav-bar">
                <Nav variant='pills' className='me-auto'>
                <Nav variant="pills" className="me-auto">
                    <Nav.Item>
                    <Nav.Link as={NavLink} to="/">Acceuil</Nav.Link>
                    </Nav.Item>
                </Nav>

                    {!props.isConnected ? 
                <Nav variant="pills" className="me-auto">

                    <>
                    <Nav.Item>
                         <Nav.Link as={NavLink} to="/signIn">Connection</Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                         <Nav.Link as={NavLink} to="/signup">Inscription</Nav.Link>
                     </Nav.Item>
                    </>
                </Nav>
                    :  
                <Nav variant="pills" className="me-auto">

                    <>
                       <Nav.Item>
                    <Nav.Link as={NavLink} to="/Calendrier">Calendrier</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Item onClick={handleLogout}>
                            <Nav.Link>Quitter</Nav.Link>
                        </Nav.Item>
                    </Nav.Item>
                    </>
                    </Nav>
                    }

                </Nav>
                   

            </Navbar.Collapse>
        </Container>
    </Navbar>
    </div>
  
  )

}

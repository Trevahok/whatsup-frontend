import React, { Component } from 'react'
import { Navbar, Nav} from 'react-bootstrap'
import {
  NavLink
} from "react-router-dom";

export default class NavBar extends Component {
    render() {
        return (

            <Navbar  bg='primary' variant="success" expand="md" >
                <Navbar.Brand >
                    <NavLink className=' text-light' to='/' > Whatsup </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                        <NavLink className='btn btn-success text-light' variant="light" to='/login' >
                            Login
                        </NavLink>
                </Navbar.Collapse>
            </Navbar>

        )
    }
}
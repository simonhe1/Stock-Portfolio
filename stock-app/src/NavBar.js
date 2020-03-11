import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavBar = () => {
    return (
        <Navbar
            expand="sm"
        >
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link href="#">Portfolio</Nav.Link>
                    <Nav.Link href="#">Transactions</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default NavBar;
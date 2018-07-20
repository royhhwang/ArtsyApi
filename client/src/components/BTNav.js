import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import '../css/BTNav.css';


class BTNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            screenSize: false
        }
    }

    componentWillMount() {
        window.addEventListener('resize', this.screenCheck);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.screenCheck);
    }

    screenCheck = () => {
        this.setState({
            screenSize: window.innerWidth < 768
        });
    }

    render() {

        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#top">Roy Hwang</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse onClick={this.mobileNavMove}>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#home" className="mobile-hide">
                            Home
                        </NavItem>
                        <NavItem eventKey={2} href="#about" className="mobile-hide">
                            About
                        </NavItem>
                        <NavItem eventKey={3} href="#contact" className="mobile-hide">
                            Contact
                        </NavItem>
                        <NavDropdown eventKey={3} title="" id="basic-nav-dropdown" className="open">
                            <MenuItem eventKey={3.1} href="#home">Home</MenuItem>
                            <MenuItem eventKey={3.2} href="#about">About</MenuItem>
                            <MenuItem eventKey={3.3} href="#contact">Contact</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
};

export default BTNav;
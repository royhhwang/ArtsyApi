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

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({
                screenSize: window.innerWidth < 768
            });
        }, false);
    }

    render() {

        const mobileOpen = this.state.screenSize ? ' open' : '';

        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#top">Roy Hwang</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#top">
                            Home
                </NavItem>
                        <NavDropdown eventKey={3} title="" id="basic-nav-dropdown" className={mobileOpen}>
                            <MenuItem eventKey={3.1}>Page</MenuItem>
                            <MenuItem eventKey={3.2}>Data</MenuItem>
                            <MenuItem eventKey={3.3}>API</MenuItem>
                            <MenuItem eventKey={3.3}>Context</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
};

export default BTNav;
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
            <Navbar inverse collapseOnSelect id="nav">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Artsy</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#top" className="mobile-hide">
                            Home
                        </NavItem>
                        <NavItem eventKey={2} href="#title" className="mobile-hide">
                            Artpiece
                        </NavItem>
                        <NavDropdown eventKey={3} title="" id="basic-nav-dropdown" className="open">
                            <MenuItem eventKey={3.1} href="#top">Home</MenuItem>
                            <MenuItem eventKey={3.3} href="#title">Artpiece</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
};

export default BTNav;
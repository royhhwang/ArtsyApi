import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import '../css/BTNav.css';
import Header from '../img/header.jpg';


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
                        <a href="#nav"><img src={Header} alt="roy icon" className="img-circle icon-block" /></a>
                        <a href="#nav" className="mobile-hide hvr-ripple-out">Roy Hwang</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#title" className="mobile-hide">
                            Title
                        </NavItem>
                        <NavItem eventKey={2} href="#carousel" className="mobile-hide">
                            Carousel
                        </NavItem>
                        <NavItem eventKey={3} href="#img" className="mobile-hide">
                            Images
                        </NavItem>
                        <NavDropdown eventKey={3} title="" id="basic-nav-dropdown" className="open">
                            <MenuItem eventKey={3.1} href="#title">Title</MenuItem>
                            <MenuItem eventKey={3.2} href="#carousel">Carousel</MenuItem>
                            <MenuItem eventKey={3.3} href="#img">Images</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
};

export default BTNav;
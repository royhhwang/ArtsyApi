import React, { Component } from 'react';
import '../css/NavBar.css';

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        }
        this.handleNavbar = this.handleNavbar.bind(this);
    }

    handleNavbar = () => {
        this.setState({ show: !this.state.show });
    }

    render() {
        const dropdownNav = this.state.show ? 'show-nav' : 'no-nav';
        return (
            <div className="navbar-layer">
                <div className="logo-layer">Roy Hwang</div>
                <div className="anchor-layer">
                    <a className="active" href="#home">Home</a>
                    <a href="#contact">Contact</a>
                    <a href="#about">About</a>
                </div>
                <div className="dropdown">
                    <button className="dropbtn" onClick={this.handleNavbar}><i className="material-icons">menu</i></button>
                    <div className={dropdownNav + " dropdown-content"}>
                        <a className="active" href="#home">Home</a>
                        <a href="#contact">Contact</a>
                        <a href="#about">About</a>
                    </div>
                </div>
            </div>
        )
    }
};

export default NavBar;
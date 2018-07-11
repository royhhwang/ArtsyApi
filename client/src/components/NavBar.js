import React, { Component } from 'react';
import '../css/NavBar.css';

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            loading: true
        }
        this.handleNavbar = this.handleNavbar.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 2000);
    }

    handleNavbar = () => {
        this.setState({ show: !this.state.show });
    }

    render() {

        const dropdownNav = this.state.show ? 'show-nav' : 'no-nav';

        if (this.state.loading) {
            return (
                <div className="load-layer">Loading</div>
            )
        }
        else {
            return (
                <div className="navbar-layer">
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
    }
};

export default NavBar;
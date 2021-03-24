import React, { useState } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container
} from "reactstrap";

import logo from "../../static/Logo.png";
import '../../css/master.css'

const Header = (props) => {
  const [isOpen, setIsOpen] = useState('');

  const type = (event) => setIsOpen(event.target.value);

  const search = (event) => {
    props.getProducts({ q: isOpen });
    event.preventDefault();
  }

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark justify-content-between" style={{ textAlign: 'center', backgroundColor: '#212529' }}>
        <div className="container">
          <a className="navbar-brand flex-grow-1" href="/home"><img src={logo} alt="" width="60"></img></a>
          <form className="form flex-grow-1 d-flex" onSubmit={search}>
            <input className="input" placeholder="Search here" type="text" value={isOpen} onChange={type} />
            <button className="search-btn txt">Search</button>
            <button className="search-btn icon" style={{ width: '50px' }}><i className="fas fa-search"></i></button>
          </form>

          <button className="navbar-toggler drop-button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ml-auto" id="navbarSupportedContent" style={{ textAlign: 'left' }}>
            <ul className="navbar-nav">
              <li className="nav-item account-text"><a href="/orders" className="nav-link">Orders</a></li>
              <li className="nav-item account-text"><a href="/history" className="nav-link">History</a></li>

              <div className="dropdown account-drop">
                <button className="btn dropdown-toggle drop-button" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  Account
                        </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a className="dropdown-item" href="/orders">Orders</a></li>
                  <li><a className="dropdown-item" href="/history">History</a></li>
                </ul>
              </div>
              {props.authState.isAuthenticated ? (
                <Nav className="ml-auto" navbar>
                  <NavbarText>
                    <span className="fa fa-user"></span>{" "}
                    {props.authState.user.full_name}
                  </NavbarText>
                  <li className="nav-item"><a href="/logout" className="nav-link">Logout</a></li>
                </Nav>
              ) : (
                <>
                  <li className="nav-item"><a href="/register" className="nav-link">Register</a></li>
                  <li className="nav-item"><a href="/login" className="nav-link">Login</a></li>
                </>
              )}
              <a className="nav-link" href="/cart" style={{ width: '4rem' }}>
                <span className="badge badge-pill bg-danger">{props.cartState.carts.count}</span> <span><i className="fas fa-shopping-cart"></i></span>
              </a>
            </ul>
          </div>
        </div>
      </nav>
    </>

  );

};

export default Header;

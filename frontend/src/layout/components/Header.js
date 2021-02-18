import React, { useState } from "react";
import * as Strap from "reactstrap";

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

import { NavLink } from "react-router-dom";
import logo from "../../static/Logo.png";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="lg">
        <Container>
          <NavLink className="navbar-brand" to="/home">
            <img src={logo} width="60" />
          </NavLink>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="sticky" className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  to="/home"
                  className="nav-link"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/cart"
                  className="nav-link"
                  activeClassName="active"
                >
                  Cart
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  to="/orders"
                  className="nav-link"
                  activeClassName="active"
                >
                  Orders
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  to="/history"
                  className="nav-link"
                  activeClassName="active"
                >
                  History
                </NavLink>
              </NavItem>
            </Nav>
            {props.authState.isAuthenticated ? (
              <Nav className="ml-auto" navbar>
                <NavbarText>
                  <span className="fa fa-user"></span>{" "}
                  {props.authState.user.full_name}
                </NavbarText>
                <NavItem>
                  <NavLink href="/logout">Logout</NavLink>
                </NavItem>
              </Nav>
            ) : (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );

  return (
    <div>
      <Strap.Navbar color="light" light expand="md">
        <Strap.Container>
          <Strap.NavbarBrand href="/home">IEEE NU</Strap.NavbarBrand>
          <Strap.NavbarToggler onClick={toggle} />
          <Strap.Collapse isOpen={isOpen} navbar>
            <Strap.Nav className="mr-auto" navbar>
              <Strap.NavItem>
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </Strap.NavItem>
              <Strap.NavItem>
                <NavLink className="nav-link" to="/cart">
                  Cart
                </NavLink>
              </Strap.NavItem>
              <Strap.NavItem>
                <NavLink className="nav-link" to="/orders">
                  Orders
                </NavLink>
              </Strap.NavItem>
              <Strap.NavItem>
                <NavLink className="nav-link" to="/history">
                  History
                </NavLink>
              </Strap.NavItem>
            </Strap.Nav>

            {props.authState.isAuthenticated ? (
              <Strap.Nav className="ml-auto" navbar>
                <Strap.NavbarText>
                  <span className="fa fa-user"></span>{" "}
                  {props.authState.user.full_name}
                </Strap.NavbarText>
                <Strap.NavItem>
                  <Strap.NavLink href="/logout">Logout</Strap.NavLink>
                </Strap.NavItem>
              </Strap.Nav>
            ) : (
              <Strap.Nav className="ml-auto" navbar>
                <Strap.NavItem>
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </Strap.NavItem>
                <Strap.NavItem>
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </Strap.NavItem>
              </Strap.Nav>
            )}
          </Strap.Collapse>
        </Strap.Container>
      </Strap.Navbar>
    </div>
  );
};

export default Header;

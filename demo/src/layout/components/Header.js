import React, { useState } from 'react';
import * as Strap from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Strap.Navbar color="light" light expand="md">
                <Strap.Container>
                    <Strap.NavbarBrand href="/home">IEEE NU</Strap.NavbarBrand>
                    <Strap.NavbarToggler onClick={toggle} />
                    <Strap.Collapse isOpen={isOpen} navbar>

                        <Strap.Nav className="mr-auto" navbar>
                            <Strap.NavItem>
                                <NavLink className="nav-link" to="/home">Home</NavLink>
                            </Strap.NavItem>
                            <Strap.NavItem>
                                <NavLink className="nav-link" to="/cart">Cart</NavLink>
                            </Strap.NavItem>
                            <Strap.NavItem>
                                <NavLink className="nav-link" to="/orders">Orders</NavLink>
                            </Strap.NavItem>
                            <Strap.NavItem>
                                <NavLink className="nav-link" to="/history">History</NavLink>
                            </Strap.NavItem>
                        </Strap.Nav>

                        {
                            props.authState.isAuthenticated
                                ?
                                <Strap.Nav className="ml-auto" navbar>
                                    <Strap.NavbarText><span className="fa fa-user"></span> {props.authState.user.full_name}</Strap.NavbarText>
                                    <Strap.NavItem>
                                        <Strap.NavLink href="/logout">Logout</Strap.NavLink>
                                    </Strap.NavItem>
                                </Strap.Nav>
                                :
                                <Strap.Nav className="ml-auto" navbar>
                                    <Strap.NavItem>
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </Strap.NavItem>
                                    <Strap.NavItem>
                                        <NavLink className="nav-link" to="/register">Register</NavLink>
                                    </Strap.NavItem>
                                </Strap.Nav>
                        }

                    </Strap.Collapse>
                </Strap.Container>
            </Strap.Navbar>
        </div>
    );
}

export default Header;
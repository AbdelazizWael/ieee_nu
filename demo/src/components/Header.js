import React, { useState } from 'react';
import * as Strap from 'reactstrap';


const Header = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Strap.Navbar color="light" light expand="md">
                <Strap.Container>
                    <Strap.NavbarBrand href="/products">IEEE NU</Strap.NavbarBrand>
                    <Strap.NavbarToggler onClick={toggle} />
                    <Strap.Collapse isOpen={isOpen} navbar>

                        <Strap.Nav className="mr-auto" navbar>
                            <Strap.NavItem>
                                <Strap.NavLink href="/products">Products</Strap.NavLink>
                            </Strap.NavItem>
                            <Strap.NavItem>
                                <Strap.NavLink href="/cart">Cart</Strap.NavLink>
                            </Strap.NavItem>
                            <Strap.NavItem>
                                <Strap.NavLink href="/history">History</Strap.NavLink>
                            </Strap.NavItem>
                        </Strap.Nav>

                        {
                            props.isAuthenticated

                                ?

                                <Strap.Nav className="ml-auto" navbar>
                                    <Strap.NavItem>
                                        <Strap.NavbarText><span className="fa fa-user"></span> {props.email}</Strap.NavbarText>
                                    </Strap.NavItem>
                                    <Strap.NavItem>
                                        <Strap.NavLink href="/logout">Log Out</Strap.NavLink>
                                    </Strap.NavItem>
                                </Strap.Nav>

                                :

                                <Strap.Nav className="ml-auto" navbar>
                                    <Strap.NavItem>
                                        <Strap.NavLink href="/login">Log In</Strap.NavLink>
                                    </Strap.NavItem>
                                    <Strap.NavItem>
                                        <Strap.NavLink href="/register">Register</Strap.NavLink>
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
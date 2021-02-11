import React from 'react';
import * as Strap from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Footer = (props) => {
    return (
        <div className="bg-light py-3 footer">
            <Strap.Container>
                <Strap.Row>
                    <Strap.Col xs="4" md="4">
                        <ul className="list-unstyled">
                            <li><NavLink to="/home">Products</NavLink></li>
                            <li><NavLink to="/cart">Cart</NavLink></li>
                            <li><NavLink to="/orders">Orders</NavLink></li>
                            <li><NavLink to="/history">History</NavLink></li>
                            {
                                props.authState.user
                                    ?
                                    props.authState.user.isStaff === 'True'
                                        ?
                                        <li><a href="/staff">Staff Panel</a></li>
                                        :
                                        null
                                    :
                                    null
                            }
                        </ul>
                    </Strap.Col>
                    <Strap.Col xs="8" md="4">
                        <p>
                            IEEE NU &copy;2021
                            Made and maintained by ####
                        </p>
                        <div className="d-flex justify-content-around">
                            <span className="fa fa-facebook" />
                            <span className="fa fa-twitter" />
                            <span className="fa fa-instagram" />
                            <span className="fa fa-envelope" />
                        </div>
                    </Strap.Col>
                </Strap.Row>
            </Strap.Container>
        </div>
    );
}

export default Footer;
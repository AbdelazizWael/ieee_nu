import React from "react";
import { Col, Container, Jumbotron, Row } from "reactstrap";

import { NavLink } from "react-router-dom";
import '../../css/master.css'


const Footer = (props) => {
  return (
    <>
    <footer style={{backgroundColor: '#495057'}} className="footer row">
                <div className="p-4 row col-12">
                    <div className="col-lg-6 col-md-12">
                        <h3>About IEEE NU</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                            Nesciunt inventore, ab quaerat eligendi numquam exceptur
                            i porro tenetur, totam veniam deserunt temporibus conseq
                            uuntur quod exercitationem omnis adipisci asperiores fug
                            iat eius. Culpa?
                        </p>
                    </div>
                    <div className="row col-lg-4 col-md-9 col-sm-9 links">
                        <div className="col-6">
                            <h5>Our Adress</h5>
                            <p>26th of July Corridor</p>
                            <p>Al Sheikh Zayed</p>
                            <p>Giza Governorate</p>
                        </div>
                        <div className="col-6">
                            <h5>Contact Us</h5>
                            <p><i className="fas fa-phone-alt"></i> +02 1234 567 897</p>
                            <p><i className="fas fa-fax"></i> +02 1234 567 897</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-3 mb-4 mb-md-0">
                        <ul className="list-unstyled links list-group ">
                            <li><a href="" className="nav-link">About</a></li>
                            <li><a href="" className="nav-link">Our Mession</a></li>
                            <li><a href="" className="nav-link">About</a></li>
                            {props.authState.user ? (
                                props.authState.user.isStaff === "True" ? (
                                  <li>
                                    <NavLink to="/staff">Staff Panel</NavLink>
                                  </li>
                                ) : null
                            ) : null}
                        </ul>
                    </div>
                </div>
                <div className="col-12 info" style={{backgroundColor: '#212529'}}>
                    <p>Made with <i className="fas fa-heart"></i> & <i className="fas fa-coffee"> </i> by IEEE NU Team</p>
                </div>
            </footer>
    </>
  );
};

export default Footer;

import React from "react";
import * as Strap from "reactstrap";
import { Col, Container, Jumbotron, Row } from "reactstrap";

import { NavLink } from "react-router-dom";

const Footer = (props) => {
  return (
    <Jumbotron
      className="mb-0"
      style={{ paddingBottom: "30px", paddingTop: "40px" }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={{ size: 4, offset: 0 }} sm={{ size: 2 }}>
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink to="/cart">Cart</NavLink>
              </li>
              <li>
                <NavLink to="/orders">Orders</NavLink>
              </li>
              <li>
                <NavLink to="/history">History</NavLink>
              </li>
              {props.authState.user ? (
                props.authState.user.isStaff === "True" ? (
                  <li>
                    <NavLink to="/staff">Staff Panel</NavLink>
                  </li>
                ) : null
              ) : null}
            </ul>
          </Col>
          <Col xs={{ size: 7 }} sm={{ size: 5 }}>
            <h5>Our Address</h5>
            <address>
              26th of July Corridor
              <br />
              Al Sheikh Zayed
              <br />
              Giza Governorate
              <br />
              <i className="fa fa-phone fa-lg"></i>: +852 1234 5678
              <br />
              <i className="fa fa-fax fa-lg"></i>: +852 8765 4321
              <br />
              <i className="fa fa-envelope fa-lg"></i>:{" "}
              <a href="mailto:mustafausama@outlook.com">
                mustafausama@outlook.com
              </a>
            </address>
          </Col>
          <Col xs={{ size: 12 }} sm={{ size: 4 }} className="align-self-center">
            <Row>
              {" "}
              <iframe
                title="Geolocation"
                className="mt-2"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAyzbtDMm8MS1VLeeEeA_4MVpYAxr0l8Oc&q=30.0118469,30.9857909&zoom=18&maptype=satellite`}
                frameBorder="0"
                width="100%"
                height="100%"
              ></iframe>
            </Row>
            <div className="text-center">
              <a
                className="btn btn-social-icon btn-facebook"
                href="http://www.facebook.com/profile.php?id="
              >
                <i className="fa fa-facebook"></i>
              </a>
              <a
                className="btn btn-social-icon btn-linkedin"
                href="http://www.linkedin.com/in/"
              >
                <i className="fa fa-linkedin"></i>
              </a>
              <a
                className="btn btn-social-icon btn-instagram"
                href="http://www.instagram.com/"
              >
                <i className="fa fa-instagram"></i>
              </a>
              <a className="btn btn-social-icon" href="mailto:">
                <i className="fa fa-envelope-o"></i>
              </a>
            </div>
          </Col>
        </Row>
        <div className="row justify-content-center">
          <div className="col-auto">
            <p>© Copyright 2020 IEEE NU</p>
          </div>
        </div>
      </Container>
    </Jumbotron>
  );

  return (
    <div className="bg-light py-3 footer">
      <Strap.Container>
        <Strap.Row>
          <Strap.Col xs="4" md="4">
            <ul className="list-unstyled">
              <li>
                <NavLink to="/home">Products</NavLink>
              </li>
              <li>
                <NavLink to="/cart">Cart</NavLink>
              </li>
              <li>
                <NavLink to="/orders">Orders</NavLink>
              </li>
              <li>
                <NavLink to="/history">History</NavLink>
              </li>
              {props.authState.user ? (
                props.authState.user.isStaff === "True" ? (
                  <li>
                    <a href="/staff">Staff Panel</a>
                  </li>
                ) : null
              ) : null}
            </ul>
          </Strap.Col>
          <Strap.Col xs="8" md="4">
            <p>IEEE NU &copy;2021 Made and maintained by ####</p>
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
};

export default Footer;

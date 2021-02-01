import React, { Component } from 'react';
import * as Strap from 'reactstrap';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password1: '',
            password2: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        this.props.register(this.state.first_name, this.state.last_name, this.state.email, this.state.password1, this.state.password2);
        event.preventDefault();
    }

    alert = (error) => {
        if (error) {
            return (
                <Strap.Row className="my-2">
                    <Strap.Col xs="12">
                        <Strap.Alert color="danger">
                            <span className="fa fa-warning"></span> Please make sure you typed the right data!
                            <p className="text-muted">{error}</p>
                        </Strap.Alert>
                    </Strap.Col>
                </Strap.Row>
            );
        }
        else if (this.props.auth.isAuthenticated) {
            this.props.pushHome();
        }
    }

    loading = (isLoading) => {
        if (isLoading) {
            return <Strap.Spinner color="black" className="mx-2 align-self-center" />;
        }
    }

    render() {
        return (
            <div className="container my-5 col-12 offset-0 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                <div className="border-gray">
                    <h3 className="text-center">Register</h3>
                    <hr />
                    <Strap.Form onSubmit={this.handleSubmit}>
                        <Strap.FormGroup row>
                            <Strap.Label for="first_name" sm="2" lg="3">First Name: </Strap.Label>
                            <Strap.Col sm="10" lg="9">
                                <Strap.Input type="text" name="first_name" id="first_name" placeholder="First Name" value={this.state.value} onChange={this.handleChange} />
                            </Strap.Col>
                        </Strap.FormGroup>
                        <Strap.FormGroup row>
                            <Strap.Label for="last_name" sm="2" lg="3">Last Name: </Strap.Label>
                            <Strap.Col sm="10" lg="9">
                                <Strap.Input type="text" name="last_name" id="last_name" placeholder="Last Name" value={this.state.value} onChange={this.handleChange} />
                            </Strap.Col>
                        </Strap.FormGroup>
                        <Strap.FormGroup row>
                            <Strap.Label for="email" sm="2" lg="3">Email: </Strap.Label>
                            <Strap.Col sm="10" lg="9">
                                <Strap.Input type="email" name="email" id="email" placeholder="Email" value={this.state.value} onChange={this.handleChange} />
                            </Strap.Col>
                        </Strap.FormGroup>
                        <Strap.FormGroup row>
                            <Strap.Label for="password1" sm="2" lg="3">Password: </Strap.Label>
                            <Strap.Col sm="10" lg="9">
                                <Strap.Input type="password" name="password1" id="password1" placeholder="Password" value={this.state.value} onChange={this.handleChange} />
                            </Strap.Col>
                        </Strap.FormGroup>
                        <Strap.FormGroup row>
                            <Strap.Label for="password2" sm="2" lg="3">Confirm Password: </Strap.Label>
                            <Strap.Col sm="10" lg="9" className="align-self-center">
                                <Strap.Input type="password" name="password2" id="password2" placeholder="Confirm Password" value={this.state.value} onChange={this.handleChange} />
                            </Strap.Col>
                        </Strap.FormGroup>
                        <div className="text-center">
                            <Strap.Button color="primary" type="submit">Register</Strap.Button>
                            {this.loading(this.props.auth.isLoading)}
                            {this.alert(this.props.auth.error)}
                        </div>
                    </Strap.Form>
                </div>
            </div>
        );
    }
}

export default SignUp;
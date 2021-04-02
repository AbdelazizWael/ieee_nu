import React from 'react';
import * as Strap from 'reactstrap';
import Loading from './components/Loading';

class Login extends React.Component {

    constructor(props) {
        super(props);

        var error = {};
        if (this.props.authState.error) {
            const keys = Object.keys(this.props.authState.error);
            keys.forEach(key => {
                if (typeof this.props.authState.error[key] === 'string') {
                    error[key] = this.props.authState.error[key];
                } else {
                    error[key] = this.props.authState.error[key][0];
                }
            })
            console.log(error);
        }

        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            password1: '',
            password2: '',
            phone_number: '',
            errors: error,
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        this.props.register(this.state);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Strap.Container className="my-4">
                    <div className="container my-5 col-12 offset-0 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className="border-gray">
                            <h3 className="text-center">Register</h3>
                            <hr />
                            <bt />

                            <Strap.Form onSubmit={this.handleSubmit}>
                                <Strap.FormGroup row>
                                    <Strap.Label for="first_name" sm="3">First Name: </Strap.Label>
                                    <Strap.Col sm="9">
                                        <Strap.Input invalid={this.state.errors.first_name ? true : false} type="text" name="first_name" id="first_name" placeholder="First Name" value={this.state.first_name} onChange={this.handleChange} />
                                        <Strap.FormFeedback>{this.state.errors.first_name}</Strap.FormFeedback>
                                    </Strap.Col>
                                </Strap.FormGroup>
                                <Strap.FormGroup row>
                                    <Strap.Label for="last_name" sm="3">Last Name: </Strap.Label>
                                    <Strap.Col sm="9">
                                        <Strap.Input invalid={this.state.errors.last_name ? true : false} type="text" name="last_name" id="last_name" placeholder="Last Name" value={this.state.last_name} onChange={this.handleChange} />
                                        <Strap.FormFeedback>{this.state.errors.last_name}</Strap.FormFeedback>
                                    </Strap.Col>
                                </Strap.FormGroup>
                                <Strap.FormGroup row>
                                    <Strap.Label for="phone_number" sm="3">Phone Number: </Strap.Label>
                                    <Strap.Col sm="9">
                                        <Strap.Input invalid={this.state.errors.phone_number ? true : false} type="text" name="phone_number" id="phone_number" placeholder="e.g: +2012345678" value={this.state.phone_number} onChange={this.handleChange} />
                                        <Strap.FormFeedback>{this.state.errors.phone_number}</Strap.FormFeedback>
                                        <Strap.FormText>Make sure to type your phone number correctly.</Strap.FormText>
                                    </Strap.Col>
                                </Strap.FormGroup>
                                <Strap.FormGroup row>
                                    <Strap.Label for="email" sm="3">Email: </Strap.Label>
                                    <Strap.Col sm="9">
                                        <Strap.Input invalid={this.state.errors.email ? true : false} type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                                        <Strap.FormFeedback>{this.state.errors.email}</Strap.FormFeedback>
                                        <Strap.FormText>This email will be verified to complete your registration.</Strap.FormText>
                                    </Strap.Col>
                                </Strap.FormGroup>
                                <Strap.FormGroup row>
                                    <Strap.Label for="password1" sm="3">Password: </Strap.Label>
                                    <Strap.Col sm="9">
                                        <Strap.Input invalid={this.state.errors.password1 ? true : false} type="password" name="password1" id="password1" placeholder="Password" value={this.state.password1} onChange={this.handleChange} />
                                        <Strap.FormFeedback>{this.state.errors.password1}</Strap.FormFeedback>
                                        <Strap.FormText>Your password should be at least 8 characters long.</Strap.FormText>
                                    </Strap.Col>
                                </Strap.FormGroup>
                                <Strap.FormGroup row>
                                    <Strap.Label for="password2" sm="3">Confirm Password: </Strap.Label>
                                    <Strap.Col sm="9" className="align-self-center">
                                        <Strap.Input invalid={this.state.errors.password2 ? true : false} type="password" name="password2" id="password2" placeholder="Confirm Password" value={this.state.password2} onChange={this.handleChange} />
                                        <Strap.FormFeedback>{this.state.errors.password2}</Strap.FormFeedback>
                                    </Strap.Col>
                                </Strap.FormGroup>
                                <div className="text-center">
                                    <Strap.Button style={{ backgroundColor: '#3888b9', border: 'none' }} type="submit">Register</Strap.Button> {this.props.authState.isLoading ? <Loading /> : null}
                                    {
                                        this.props.authState.message
                                            ?
                                            <Strap.Row className="my-2">
                                                <Strap.Col xs="12">
                                                    <Strap.Alert color="success">
                                                        <span className="fa fa-thumbs-up"></span> {this.props.authState.message}
                                                    </Strap.Alert>
                                                </Strap.Col>
                                            </Strap.Row>
                                            :
                                            null
                                    }
                                </div>
                            </Strap.Form>

                        </div>
                    </div>
                </Strap.Container>
            </div>
        );
    }
}

export default Login;
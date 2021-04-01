import React from 'react';
import axios from 'axios';
import * as Strap from 'reactstrap';
import Loading from './components/Loading';
import baseUrl from '../shared/baseUrl';


class ResetFPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            uid: '',
            token: '',
            new_password1: '',
            new_password2: '',
            errors: {},
            isLoading: false
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        this.setState({ isLoading: true })
        axios.post(baseUrl + 'auth/password/reset/confirm/', this.state)
            .then(res => {
                this.props.pushTo("/login");
            })
            .catch(error => {
                this.setState({ errors: error.response.data })
                console.log(error.response.data)
            });
        this.setState({ isLoading: false })
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Strap.Container className="my-4">
                    <div className="container my-5 col-12 offset-0 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className="border-gray">
                            <h3 className="text-center">Forgot Password</h3>
                            <hr />
                            <br />

                            <Strap.Form onSubmit={this.handleSubmit}>
                                <Strap.FormGroup row>
                                    <Strap.Label for="uid" sm="3">UID: </Strap.Label>
                                    <Strap.Col sm="9">
                                        <Strap.Input invalid={this.state.errors.uid ? true : false} type="password" name="uid" id="uid" placeholder="UID" value={this.state.uid} onChange={this.handleChange} />
                                        <Strap.FormFeedback>{this.state.errors.uid}</Strap.FormFeedback>
                                        <Strap.FormText>Your password should be at least 8 characters long.</Strap.FormText>
                                    </Strap.Col>
                                </Strap.FormGroup>
                                <Strap.FormGroup row>
                                    <Strap.Label for="token" sm="3">Token: </Strap.Label>
                                    <Strap.Col sm="9">
                                        <Strap.Input invalid={this.state.errors.token ? true : false} type="password" name="token" id="token" placeholder="Token" value={this.state.token} onChange={this.handleChange} />
                                        <Strap.FormFeedback>{this.state.errors.token}</Strap.FormFeedback>
                                        <Strap.FormText>Your password should be at least 8 characters long.</Strap.FormText>
                                    </Strap.Col>
                                </Strap.FormGroup>
                                <Strap.FormGroup row>
                                    <Strap.Label for="new_password1" sm="3">Password: </Strap.Label>
                                    <Strap.Col sm="9">
                                        <Strap.Input invalid={this.state.errors.new_password1 ? true : false} type="password" name="new_password1" id="new_password1" placeholder="Password" value={this.state.new_password1} onChange={this.handleChange} />
                                        <Strap.FormFeedback>{this.state.errors.new_password1}</Strap.FormFeedback>
                                        <Strap.FormText>Your password should be at least 8 characters long.</Strap.FormText>
                                    </Strap.Col>
                                </Strap.FormGroup>
                                <Strap.FormGroup row>
                                    <Strap.Label for="new_password2" sm="3">Confirm Password: </Strap.Label>
                                    <Strap.Col sm="9" className="align-self-center">
                                        <Strap.Input invalid={this.state.errors.new_password2 ? true : false} type="password" name="new_password2" id="new_password2" placeholder="Confirm Password" value={this.state.new_password2} onChange={this.handleChange} />
                                        <Strap.FormFeedback>{this.state.errors.new_password2}</Strap.FormFeedback>
                                    </Strap.Col>
                                </Strap.FormGroup>
                                <div className="text-center">
                                    <Strap.Button style={{ backgroundColor: '#3888b9', border: 'none' }} type="submit">Send</Strap.Button> {this.state.isLoading ? <Loading /> : null}
                                </div>
                            </Strap.Form>

                        </div>
                    </div>
                </Strap.Container>
            </div>
        );
    }
}

export default ResetFPassword;
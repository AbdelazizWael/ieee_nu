import React from 'react';
import axios from 'axios';
import * as Strap from 'reactstrap';
import Loading from './components/Loading';
import ErrorDisplay from './components/ErrorDisplay';
import baseUrl from '../shared/baseUrl';


class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            error: null,
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
        axios.post(baseUrl + 'auth/password/reset/', { email: this.state.email })
            .then(res => {
                this.props.pushTo("/password/reset/confirm");
            })
            .catch(error => {
                this.setState({ error: <ErrorDisplay error="Please make sure you typed the right email!" /> })
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
                            <div>
                                <Strap.Alert color="info" className="mb-3" fade={false}>
                                    <span className="fa fa-info-circle"></span> You will receive an email with a "uid" and a "token". Both will be used to reset your password.
                                </Strap.Alert>
                                <br />
                            </div>

                            <Strap.Form onSubmit={this.handleSubmit}>
                                <Strap.FormGroup row>
                                    <Strap.Label for="email" sm="2">Email: </Strap.Label>
                                    <Strap.Col sm="10">
                                        <Strap.Input type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                                    </Strap.Col>
                                </Strap.FormGroup>
                                <div className="text-center">
                                    <Strap.Button style={{ backgroundColor: '#3888b9', border: 'none' }} type="submit">Send</Strap.Button> {this.state.isLoading ? <Loading /> : null}
                                    {this.state.error}
                                </div>
                            </Strap.Form>

                        </div>
                    </div>
                </Strap.Container>
            </div>
        );
    }
}

export default ForgotPassword;
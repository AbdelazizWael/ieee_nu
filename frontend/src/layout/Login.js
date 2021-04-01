import React from 'react';
import * as Strap from 'reactstrap';
import Loading from './components/Loading';
import ErrorDisplay from './components/ErrorDisplay';

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
        }

        this.state = {
            email: '',
            password: '',
            errors: error,
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        this.props.login(this.state);
        event.preventDefault();

        if (this.props.authState.isAuthenticated) {
            this.props.getCarts();
            this.props.getOrders();
            this.props.getHistory();
            this.props.pushHome();
        }
    }

    showError = () => {
        const err = this.props.authState.error;
        if (err) {
            try {
                return <ErrorDisplay error={err.non_field_errors[0]} />;
            } catch {
                return null;
            }
        }
    }

    render() {
        return (
            <div>
                <Strap.Container className="my-4">
                    <div className="container my-5 col-12 offset-0 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className="border-gray">
                            <h3 className="text-center">Login</h3>
                            <hr />
                            <bt />

                            <Strap.Form onSubmit={this.handleSubmit}>
                                <Strap.FormGroup row>
                                    <Strap.Label for="email" sm="2">Email: </Strap.Label>
                                    <Strap.Col sm="10">
                                        <Strap.Input invalid={this.state.errors.email ? true : false} type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                                        <Strap.FormFeedback>{this.state.errors.email}</Strap.FormFeedback>
                                    </Strap.Col>
                                </Strap.FormGroup>
                                <Strap.FormGroup row>
                                    <Strap.Label for="password" sm="2">Password: </Strap.Label>
                                    <Strap.Col sm="10">
                                        <Strap.Input invalid={this.state.errors.password ? true : false} type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                        <Strap.FormFeedback>{this.state.errors.password}</Strap.FormFeedback>
                                    </Strap.Col>
                                </Strap.FormGroup>
                                <div className="text-center">
                                    <Strap.Button style={{ backgroundColor: '#3888b9', border: 'none' }} type="submit">Log In</Strap.Button> {this.props.authState.isLoading ? <Loading /> : null}
                                    {this.showError()}
                                </div>

                                {
                                    this.props.location.state
                                        ?
                                        <Strap.Row className="my-3">
                                            <Strap.Col xs="12">
                                                <Strap.Alert color="danger" fade={false}>
                                                    <span className="fa fa-warning"></span> {this.props.location.state.message}
                                                </Strap.Alert>
                                            </Strap.Col>
                                        </Strap.Row>
                                        :
                                        null
                                }

                            </Strap.Form>
                            <a href="/password/reset" className="text-muted">Forgot Your Password?</a>

                        </div>
                    </div>
                </Strap.Container>
            </div>
        );
    }
}

export default Login;
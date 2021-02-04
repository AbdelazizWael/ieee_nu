import React, { Component } from 'react';
import * as Strap from 'reactstrap';

class LogIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
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
        this.props.login(this.state.email, this.state.password);
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
                    <h3 className="text-center">Log In</h3>
                    <hr />
                    <Strap.Form onSubmit={this.handleSubmit}>
                        <Strap.FormGroup row>
                            <Strap.Label for="email" sm="2">Email: </Strap.Label>
                            <Strap.Col sm="10">
                                <Strap.Input type="text" name="email" id="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
                            </Strap.Col>
                        </Strap.FormGroup>
                        <Strap.FormGroup row>
                            <Strap.Label for="password" sm="2">Password: </Strap.Label>
                            <Strap.Col sm="10">
                                <Strap.Input type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                            </Strap.Col>
                        </Strap.FormGroup>
                        <div className="text-center">
                            <Strap.Button color="primary" type="submit">Log In</Strap.Button>
                            {this.loading(this.props.auth.isLoading)}
                            {this.alert(this.props.auth.error)}
                        </div>
                        {
                            this.props.location.state
                                ?
                                <Strap.Row className="my-3">
                                    <Strap.Col xs="12">
                                        <Strap.Alert color="warning" fade={false}>
                                            <span className="fa fa-warning"></span> {this.props.location.state.message}
                                        </Strap.Alert>
                                    </Strap.Col>
                                </Strap.Row>
                                :
                                null
                        }
                    </Strap.Form>
                </div>
            </div>
        );
    }
}

export default LogIn;
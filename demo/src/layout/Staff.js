import React from 'react';
import * as Strap from 'reactstrap';
import Order from './components/Order';
import axios from 'axios';
import basUrl from '../shared/baseUrl';
import { header } from '../redux/utils';

class Staff extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            order: null,
            order_id: '',
            error: '',
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        this.setState({ order: null, order_id: '', error: '' })
        axios.get(basUrl + `store/all-orders/${this.state.id}/`, header())
            .then(res => {
                this.setState({ order: res.data, order_id: res.data.id });
            })
            .catch(error => this.setState({ error: error.message }));

        event.preventDefault();
    }

    verifyOrder = () => {
        axios.post(basUrl + 'store/verify-order/', { order_id: this.state.order_id }, header())
            .then(res => this.setState({ error: 'Done!' }))
            .catch(error => this.setState({ error: error.message }));
    }

    render() {

        return (
            <div>
                <Strap.Container className="my-4">
                    <Strap.Row>
                        <Strap.Col>
                            <h3>Verify Order</h3>
                        </Strap.Col>
                    </Strap.Row>

                    <hr />

                    <Strap.Row className="my-4">
                        <form onSubmit={this.handleSubmit} className="w-100">
                            <Strap.Col sm="8" className="offset-sm-2">
                                <Strap.InputGroup>
                                    <Strap.Input type="text" id="id" name="id" placeholder="Type Order ID" onChange={this.handleChange} value={this.state.id} />
                                    <Strap.InputGroupAddon addonType="append">
                                        <Strap.Button color="primary">
                                            <span className="fa fa-search"></span> Get Order
                                    </Strap.Button>
                                    </Strap.InputGroupAddon>
                                </Strap.InputGroup>
                            </Strap.Col>
                        </form>
                    </Strap.Row>

                    {
                        this.state.order
                            ?
                            <div>
                                <h5><b>Customer:</b> {this.state.order.customer.full_name}</h5>
                                <Order order={this.state.order} />
                            </div>
                            :
                            null
                    }

                    {
                        this.state.error
                            ?
                            <p>{this.state.error}</p>
                            :
                            null
                    }

                    <Strap.Row className="d-flex justify-content-center">
                        <Strap.Button color="primary" onClick={this.verifyOrder}>Verify Order</Strap.Button>
                    </Strap.Row>
                </Strap.Container>
            </div>
        );
    }
}

export default Staff;
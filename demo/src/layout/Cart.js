import React from 'react';
import * as Strap from 'reactstrap';
import CartCard from './components/CartCard';
import Loading from './components/Loading';

class Cart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            count: null,
            cart: null
        }
    }

    toggle = () => this.setState({ modal: !this.state.modal });

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        this.props.updateCart(this.state.cart.id, this.state.count);
        this.toggle();
        event.preventDefault();
    }

    renderCarts = () => {
        const isLoading = this.props.cartState.isLoading;
        const error = this.props.cartState.error;
        const carts = this.props.cartState.carts.results;

        const update = (cart, count) => (event) => {
            this.setState({ cart: cart, count: count });
            this.toggle();
            event.preventDefault();
        }

        const del = (cart_id) => (event) => {
            this.props.deleteCart(cart_id);
            event.preventDefault();
        }

        if (isLoading) {
            return <Loading />;
        }
        else if (error) {
            return <h4>{error}</h4>;
        }
        else if (carts) {
            const cartsView = carts.map(cart => {
                const cartProps = {
                    cart: cart,
                    update: update,
                    del: del,
                };

                return (
                    <Strap.Col xs="12" sm="6" lg="4">
                        <CartCard {...cartProps} />
                    </Strap.Col>
                );
            });

            return (
                <React.Fragment>
                    {cartsView}
                </React.Fragment>
            );
        }
    }

    removeCarts = () => {
        const carts = this.props.cartState.carts.results;
        carts.forEach(cart => {
            this.props.deleteCart(cart.id);
        });
    }

    render() {
        const flag = this.props.cartState.carts.count === 0;
        return (
            <div>
                <Strap.Container className="my-4">
                    <Strap.Row>
                        <Strap.Col md="8">
                            <h3>Your Cart</h3>
                        </Strap.Col>
                        <Strap.Col md="4">
                            <a className={flag ? "btn btn-danger disabled" : "btn btn-danger"} href="/home" onClick={this.removeCarts}>
                                <span className="fa fa-trash"></span> Remove all
                            </a> {' '}
                            <a className={flag ? "btn btn-success disabled" : "btn btn-success"} href="/orders" onClick={this.props.placeOrder}>
                                <span className="fa fa-check"></span> Place Order
                            </a>
                        </Strap.Col>
                    </Strap.Row>

                    <hr />
                    <br />

                    <Strap.Row>
                        {this.renderCarts()}
                    </Strap.Row>
                </Strap.Container>

                <Strap.Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <Strap.ModalHeader toggle={this.toggle}>Edit Item</Strap.ModalHeader>
                    <Strap.ModalBody>
                        <Strap.Form>
                            <Strap.FormGroup row>
                                <Strap.Label for="count" sm="3">Count: </Strap.Label>
                                <Strap.Col sm="9">
                                    <Strap.Input type="number" name="count" id="count" placeholder="Count" value={this.state.count} onChange={this.handleChange} />
                                </Strap.Col>
                            </Strap.FormGroup>
                        </Strap.Form>
                    </Strap.ModalBody>
                    <Strap.ModalFooter>
                        <Strap.Button color="primary" onClick={this.handleSubmit}>Update</Strap.Button>{' '}
                        <Strap.Button color="secondary" onClick={this.toggle}>Cancel</Strap.Button>
                    </Strap.ModalFooter>
                </Strap.Modal>

            </div>
        );
    }
}

export default Cart;
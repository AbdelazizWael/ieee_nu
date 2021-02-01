import React, { Component } from 'react';
import * as Strap from 'reactstrap';

class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            count: 0,
            cart: null
        };
    }

    handleSubmit = (event) => {
        if (this.props.isAuthenticated) {
            var cart = this.state.cart;
            cart.count = this.state.count;
            this.props.putCart(cart);
        }
        event.preventDefault();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value
        this.setState({ [name]: value });
    }

    renderCarts = ({ isLoading, error, carts }) => {
        if (isLoading) {
            return <Strap.Spinner className="text-center" color="black" />;
        }
        else if (error) {
            return <h4>{error}</h4>;
        }
        else if (carts) {

            const del = cart => event => {
                if (this.props.isAuthenticated) {
                    this.props.deleteCart(cart.id);
                }
            }

            const update = cart => event => {
                this.setState({
                    count: cart.count,
                    cart: cart
                });
                this.toggle();
            }

            return (
                <div>
                    {carts.map(cart => {
                        var product;
                        this.props.products.forEach(prod => {
                            if (prod.id === cart.product_id) {
                                product = prod;
                            }
                        })
                        return (
                            <Strap.Card body className="my-2" key={cart.id} color='white'>
                                <Strap.Row>
                                    <Strap.Col sm="10" className="align-self-center">
                                        <Strap.CardTitle tag="h5">{product.name}</Strap.CardTitle>
                                        <Strap.CardSubtitle className="my-2"><span className="fa fa-money"></span> Product Price: {product.price}</Strap.CardSubtitle>
                                        <Strap.CardSubtitle className="my-2"><span className="fa fa-sort-numeric-asc"></span> Count: {cart.count}</Strap.CardSubtitle>
                                        <Strap.CardSubtitle className="my-2"><span className="fa fa-money"></span> Compound Price: {cart.compound_price}</Strap.CardSubtitle>
                                    </Strap.Col>
                                    <Strap.Col sm="2" className="align-self-center">
                                        <Strap.ButtonGroup size="lg" className="my-2">
                                            <Strap.Button color="danger" onClick={del(cart)} title="Delete!"><span className="fa fa-trash"></span></Strap.Button>
                                            <Strap.Button color="warning" onClick={update(cart)}><span className="fa fa-pencil" title="Edit"></span></Strap.Button>
                                        </Strap.ButtonGroup>
                                    </Strap.Col>
                                </Strap.Row>
                            </Strap.Card>
                        );
                    })}
                </div>
            )
        }
    }

    toggle = () => { this.setState({ modal: !this.state.modal }); }

    render() {

        const verify = () => {
            this.props.cartState.carts.forEach(cart => {
                cart.verified = true;
                this.props.putCart(cart);
            })
        }

        return (
            <div>
                <div>
                    <Strap.Container className="my-5">
                        <Strap.Row>
                            <Strap.Col>
                                <h3 className="px-2 my-1">Cart</h3>
                            </Strap.Col>
                        </Strap.Row>
                        <hr />
                        <br />
                        {this.renderCarts(this.props.cartState)}
                        <Strap.Button color="success" onClick={verify}><span className="fa fa-lock"> Verify</span></Strap.Button>
                    </Strap.Container>
                </div>
                <div>
                    <Strap.Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <Strap.ModalHeader toggle={this.state.toggle}>Update Count</Strap.ModalHeader>
                        <Strap.Form onSubmit={this.handleSubmit}>
                            <Strap.ModalBody>
                                <Strap.FormGroup row>
                                    <Strap.Label for="count" xs="12" sm="3">Count:</Strap.Label>
                                    <Strap.Col xs="12" sm="9">
                                        <Strap.Input type="number" name="count" id="count" value={this.state.count} onChange={this.handleChange} autoComplete="off" />
                                    </Strap.Col>
                                </Strap.FormGroup>
                            </Strap.ModalBody>
                            <Strap.ModalFooter>
                                <Strap.Button color="secondary" onClick={this.toggle}>Cancel</Strap.Button>{' '}
                                <Strap.Button color="primary" type="submit">Update</Strap.Button>
                            </Strap.ModalFooter>
                        </Strap.Form>
                    </Strap.Modal>
                </div>

            </div>
        );
    }
}

export default Cart;
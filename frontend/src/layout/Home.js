import React, { Component } from 'react';
import * as Strap from 'reactstrap';
import ProductCard from './components/ProductCard';
import Loading from './components/Loading';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            q: '',
        }
    }

    renderProducts = () => {
        const isLoading = this.props.productState.isLoading;
        const error = this.props.productState.error;
        const products = this.props.productState.products.results;

        const add = (product) => (event) => {
            this.props.addCart({ product_id: product.id, count: 1 });
            event.preventDefault();
        }

        if (isLoading) {
            return <Loading />;
        }
        else if (error) {
            return <h4>{error}</h4>;
        }
        else if (products) {
            const productsView = products.map(product => {
                const prodProps = {
                    product: product,
                    add: add,
                    isAuthenticated: this.props.authState.isAuthenticated,
                }

                return (
                    <Strap.Col xs="12" sm="6" lg="4">
                        <ProductCard {...prodProps} />
                    </Strap.Col>
                );
            });

            return (
                <React.Fragment>
                    {productsView}
                </React.Fragment>
            );
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        this.props.getProducts(this.state);
        event.preventDefault();
    }

    render() {

        return (
            <div>
                <Strap.Container className="my-4">
                    <Strap.Row>
                        <Strap.Col>
                            <h3>Products</h3>
                        </Strap.Col>
                    </Strap.Row>

                    <hr />
                    {
                        this.props.authState.isAuthenticated
                            ?
                            null
                            :
                            <div>
                                <Strap.Alert color="warning" className="mb-3" fade={false}>
                                    <span className="fa fa-warning"></span> You're not logged in yet! Consider logging in to be able to place orders.
                                </Strap.Alert>
                            </div>
                    }

                    <Strap.Row className="my-4">
                        <form onSubmit={this.handleSubmit} className="w-100">
                            <Strap.Col sm="8" className="offset-sm-2">
                                <Strap.InputGroup>
                                    <Strap.Input type="text" id="q" name="q" placeholder="Search" onChange={this.handleChange} value={this.state.q} />
                                    <Strap.InputGroupAddon addonType="append">
                                        <Strap.Button color="primary">
                                            <span className="fa fa-search"></span> Search
                                    </Strap.Button>
                                    </Strap.InputGroupAddon>
                                </Strap.InputGroup>
                            </Strap.Col>
                        </form>
                    </Strap.Row>

                    <Strap.Row>
                        {this.renderProducts()}
                    </Strap.Row>
                </Strap.Container>
            </div>
        );
    }
}

export default Home;
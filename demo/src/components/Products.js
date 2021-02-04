import React, { Component, useState } from 'react';
import * as Strap from 'reactstrap';

const RenderDesc = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const hidden = (
        <React.Fragment>
            show description <span className="fa fa-toggle-down"></span>
        </React.Fragment>
    );

    const shown = (
        <React.Fragment>
            hide description <span className="fa fa-toggle-up"></span>
        </React.Fragment>
    );

    const hiddenText = (
        <React.Fragment>
            <Strap.Collapse isOpen={isOpen}>
                {props.desc}
            </Strap.Collapse>
            <button onClick={toggle} className="border-0 text-muted bg-transparent p-0 showBtn">
                {isOpen ? shown : hidden}
            </button>
        </React.Fragment>
    );

    return (
        <div className="my-2">
            {hiddenText}
        </div>
    );
}

class Product extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    renderProducts = ({ isLoading, error, products }) => {
        if (isLoading) {
            return <Strap.Spinner className="text-center" color="black" />;
        }
        else if (error) {
            return <h4>{error}</h4>;
        }
        else if (products) {
            const add = (product) => (event) => {
                const cart = {
                    product_id: product.id,
                    count: 1
                }
                this.props.postCart(cart);
            }

            const get_button = (product) => {
                if (this.props.isAuthenticated) {
                    if (this.props.carts) {
                        this.props.carts.forEach(cart => {
                            if (cart.product_id === product.id) {
                                return <Strap.Button color="success" disabled><span className="fa fa-plus"></span> Already Added!</Strap.Button>
                            }
                        })
                        return <Strap.Button color="success" onClick={add(product)} title="Add to cart"><span className="fa fa-plus"></span> Add</Strap.Button>
                    }
                    return <Strap.Button color="success" onClick={add(product)} title="Add to cart"><span className="fa fa-plus"></span> Add</Strap.Button>
                }
            }

            return (
                <div>
                    {products.map(product => {
                        return (
                            <Strap.Card body className="my-2" key={product.id} color="white">
                                <Strap.Row>
                                    <Strap.Col sm="3">
                                        <img className="w-100 img-fluid" src={product.image} alt="..." />
                                    </Strap.Col>
                                    <Strap.Col className="align-self-center" sm="7">
                                        <Strap.CardTitle tag="h5">{product.name}</Strap.CardTitle>
                                        <Strap.CardSubtitle className="my-2"><span className="fa fa-money"></span> Price: {product.price}</Strap.CardSubtitle>
                                        <Strap.CardSubtitle className="my-2"><span className="fa fa-sort-numeric-asc"></span> Count: {product.count}</Strap.CardSubtitle>
                                        <Strap.CardSubtitle className="my-2">
                                            <RenderDesc desc={product.description} />
                                        </Strap.CardSubtitle>
                                    </Strap.Col>
                                    <Strap.Col className="align-self-center" sm="2">
                                        {get_button(product)}
                                    </Strap.Col>
                                </Strap.Row>
                            </Strap.Card>
                        )
                    })
                    }
                </div >
            )
        }
    }

    render() {
        return (
            <div>
                <Strap.Container className="my-5">
                    <Strap.Row>
                        <Strap.Col>
                            <h3 className="px-2 my-1">Products</h3>
                        </Strap.Col>
                    </Strap.Row>
                    <hr />
                    <br />
                    {this.renderProducts(this.props.productState)}
                </Strap.Container>
            </div>
        );
    }
}

export default Product;
import React, { Component } from 'react';
import * as Strap from 'reactstrap';
import ProductCard from './components/ProductCard';
import Loading from './components/Loading';
import Pagination from './components/pagesCounter';
import '../css/master.css'
import Pop from './components/PopUp'
import { isMobileOnly, isBrowser } from "react-device-detect";


/* For development purposes */

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            q: '',
            currentPage: 1, 
            productsPerPage: 12,
            product: {},
            modalState: false
        }
    }
    setCurrentPage = (newPage) => {
        this.setState({
            currentPage: newPage
        })
    }
    modal = (product) => {
        if (!isMobileOnly) {
            this.setState({
                product: product,
                modalState: ! this.state.modalState
            })
        } else {
            if (window.screen.orientation.angle == 0) {
                this.setState({
                    product: product,
                    modalState: ! this.state.modalState
                })
            }
        }
        console.log(isMobileOnly)
    }
    closeModal = (event) => {
        if(event.target.classList.contains('popScreen')) {
            this.setState({
                modalState: !this.state.modalState
            })
        }
    }
    

    

    renderProducts = () => {
        const isLoading = this.props.productState.isLoading;
        const error = this.props.productState.error;
        const products = this.props.productState.products.results;
        window.onorientationchange = () => {
            if (isMobileOnly) {
                console.log('mobile')
                this.setState({
                    modalState: false
                })
            }
        };
        

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
            const indexOfLastProduct = this.state.currentPage * this.state.productsPerPage;
            const indexOfFirstProduct = indexOfLastProduct - this.state.productsPerPage;
            const currentProduct = products.slice(indexOfFirstProduct, indexOfLastProduct);
            // console.log(products.length)

            const productsView = currentProduct.map(product => {
                const prodProps = {
                    product: product,
                    add: add,
                    isAuthenticated: this.props.authState.isAuthenticated,
                }

                return (
                    <>
                        <ProductCard  {...prodProps} modal = {this.modal} />
                    </>
                );
            });
            
            
            return (
                <>
                    {
                        this.state.modalState ? 
                        <div className="popScreen" onClick={this.closeModal} style={{zIndex: 2}}>
                        <Pop 
                            product = {this.state.product}
                            add = {add}
                        />
                        </div> : <></>
                    }
                    <React.Fragment>
                        {productsView}
                    </React.Fragment>
                    <Pagination 
                            productsPerPage = {this.state.productsPerPage}
                            totalProducts = {products.length}
                            paginate = {this.setCurrentPage}
                    />
                </>
                

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
                                <Strap.Alert color="danger" className="mb-3" fade={false}>
                                    <span className="fa fa-warning"></span> You're not logged in yet! Consider logging in to be able to place orders.
                                </Strap.Alert>
                            </div>
                    }

                    <Strap.Row className="my-4">
                        
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
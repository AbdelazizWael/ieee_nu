import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from './Header';
import Products from './Products';
import History from './History';
import Cart from './Cart';
import Register from './Register';
import LogIn from './LogIn';
import { connect } from 'react-redux';
import { login, register, logout } from '../store/actions/authActions';
import { getProducts } from '../store/actions/productsActions';
import { getCarts, postCart, putCart, deleteCart } from '../store/actions/cartActions';
import { getHistory } from '../store/actions/historyActions';

const mapStateToProps = (state) => ({
    auth: state.auth,
    productState: state.productState,
    cartState: state.cartState,
    historyState: state.historyState,
});

const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => { dispatch(login(email, password)) },
    register: (first_name, last_name, email, password1, password2) => { dispatch(register(first_name, last_name, email, password1, password2)) },
    logout: () => { dispatch(logout()) },
    getProducts: () => { dispatch(getProducts()) },
    getCarts: () => { dispatch(getCarts()) },
    postCart: (cart) => { dispatch(postCart(cart)) },
    putCart: (cart) => { dispatch(putCart(cart)) },
    deleteCart: (cart_id) => { dispatch(deleteCart(cart_id)) },
    getHistory: () => { dispatch(getHistory()) }
});

class Main extends Component {

    componentDidMount() {
        this.props.getProducts();
        this.props.getCarts();
        this.props.getHistory();
    }

    render() {

        const pushHome = () => { this.props.history.push("/home") };

        const logoutView = () => {
            this.props.logout();
            return <Redirect to="/products" />;
        };

        const authProps = {
            pushHome: pushHome,
            auth: this.props.auth,
            register: this.props.register,
            login: this.props.login
        };

        const loginOnly = (comp) => {
            if (this.props.auth.isAuthenticated) {
                return comp;
            }
            else {
                return <Redirect to={{ pathname: '/login', state: { message: "You have to log in first to use this functionality!" } }} />;
            }
        }

        const productsProps = {
            productState: this.props.productState,
            isAuthenticated: this.props.auth.isAuthenticated,
            carts: this.props.cartState.carts,
            postCart: this.props.postCart
        };

        const cartProps = {
            isAuthenticated: this.props.auth.isAuthenticated,
            cartState: this.props.cartState,
            getCarts: this.props.getCarts,
            postCart: this.props.postCart,
            putCart: this.props.putCart,
            deleteCart: this.props.deleteCart,
            products: this.props.productState.products
        };

        const historyProps = {
            historyState: this.props.historyState
        };

        return (
            <div>
                <Header logout={this.props.logout} isAuthenticated={this.props.auth.isAuthenticated} email={this.props.auth.email} />
                <div className="content">
                    <Switch>
                        <Route exact path="/products" component={() => <Products {...productsProps} />} />
                        <Route exact path="/cart" component={() => loginOnly(<Cart  {...cartProps} />)} />
                        <Route exact path="/history" component={() => loginOnly(<History  {...historyProps} />)} />
                        <Route exact path="/register" component={() => <Register  {...authProps} />} />
                        <Route exact path="/login" component={(props) => <LogIn {...authProps} {...props} />} />
                        <Route exact path="/logout" component={logoutView} />
                        <Redirect from="/" to="/products" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
import React from 'react';
import * as Strap from 'reactstrap';
import Loading from './components/Loading';
import Order from './components/Order';

class Orders extends React.Component {

    renderOrders = () => {
        const isLoading = this.props.orderState.isLoading;
        const error = this.props.orderState.error;
        const orders = this.props.orderState.orders.results;

        if (isLoading) {
            return <Loading />;
        }
        else if (error) {
            return <h4>{error}</h4>;
        }
        else if (orders) {
            const ordersView = orders.map(order => {
                return <Order order={order} />
            });

            return (
                <div>
                    {ordersView}
                </div>
            );
        }
    }

    render() {

        return (
            <div>
                <Strap.Container className="my-4">
                    <Strap.Row>
                        <Strap.Col>
                            <h3>Orders</h3>
                        </Strap.Col>
                    </Strap.Row>

                    <hr />
                    <div>
                        <Strap.Alert color="info" className="mb-3" fade={false}>
                            <span className="fa fa-info-circle"></span> Orders automatically expire 7 days after the availability date. Please make sure to go to Nile University on the specified date, any time from 8 A.M. to 6 P.M., to receive your order.
                        </Strap.Alert>
                        <br />
                    </div>

                    {this.renderOrders()}
                </Strap.Container>
            </div>
        );
    }
}

export default Orders;
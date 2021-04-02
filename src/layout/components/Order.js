import React from 'react';
import * as Strap from 'reactstrap';

const Order = (props) => {

    const carts = props.order.carts;
    const _date = new Date(props.order.delivery_time);

    const date = _date.toDateString()

    const renderCart = carts.map(cart => {
        return (
            <React.Fragment>
                <Strap.Row className="px-4 py-2">
                    <Strap.Col sm="4">
                        <p className="mb-0"><b>Name:</b> {cart.product.name}</p>
                    </Strap.Col>
                    <Strap.Col sm="4">
                        <p className="mb-0"><b>Count:</b> {cart.count}</p>
                    </Strap.Col>
                    <Strap.Col sm="4">
                        <p className="mb-0"><b>Price:</b> {cart.compound_price}</p>
                    </Strap.Col>
                </Strap.Row>
                <hr className="m-1 p-0" />
            </React.Fragment>
        )
    })

    return (
        <div>
            <Strap.Card body className="mb-4" key={props.order.id} color="white">
                {renderCart}
                <div className="px-2 my-3">
                    <p><span className="fa fa-money"></span> <b>Full Price:</b> {props.order.full_price}</p>
                    <p><span className="fa fa-calendar"></span> <b>Available on:</b> {date}</p>
                </div>
            </Strap.Card>
        </div>
    );
}

export default Order;
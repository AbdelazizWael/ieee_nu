import React from 'react';
import * as Strap from 'reactstrap';

const CartCard = (props) => {
    return (
        <div key={props.cart.id}>
            <Strap.Card>
                <div class="embed-responsive embed-responsive-4by3">
                    <img className="card-img-top embed-responsive-item" src={props.cart.product.image} alt={props.cart.product.name} />
                </div>
                <Strap.CardBody>
                    <Strap.CardTitle tag="h4">{props.cart.product.name}</Strap.CardTitle>
                    <Strap.CardSubtitle tag="p" className="text-muted my-1">
                        <span className="fa fa-sort-numeric-desc"></span> Quantity: {props.cart.count}
                    </Strap.CardSubtitle>
                    <Strap.CardSubtitle tag="p" className="mt-2">
                        <span className="fa fa-money"></span> Product Price: {props.cart.product.price} LE
                    </Strap.CardSubtitle>
                    <Strap.CardText tag="p" className="mb-2">
                        <span className="fa fa-money"></span> Total Price: {props.cart.compound_price} LE
                    </Strap.CardText>
                    <Strap.ButtonGroup size="md">
                        <Strap.Button color="danger" onClick={props.del(props.cart.id)}>
                            <span className="fa fa-trash"></span>
                        </Strap.Button>
                        <Strap.Button color="warning" onClick={props.update(props.cart, props.cart.count)}>
                            <span className="fa fa-pencil"></span>
                        </Strap.Button>
                    </Strap.ButtonGroup>
                </Strap.CardBody>
            </Strap.Card>
        </div>
    );
}

export default CartCard;
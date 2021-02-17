import React from 'react';
import * as Strap from 'reactstrap';

const CartCard = (props) => {
    return (
        <div key={props.cart.id}>
            <Strap.Card>
                <Strap.CardImg top width="100%" src={props.cart.product.image} alt={props.cart.product.name} />
                <Strap.CardBody>
                    <Strap.CardTitle tag="h4">{props.cart.product.name}</Strap.CardTitle>
                    <Strap.CardSubtitle tag="p" className="mb-2">
                        <span className="fa fa-money"></span> Product Price: {props.cart.product.price}
                    </Strap.CardSubtitle>
                    <Strap.CardSubtitle tag="p" className="text-muted my-1">
                        <span className="fa fa-sort-numeric-desc"></span> Count: {props.cart.count}
                    </Strap.CardSubtitle>
                    <Strap.CardText tag="p" className="mb-2">
                        <span className="fa fa-money"></span> Compound Price: {props.cart.compound_price}
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
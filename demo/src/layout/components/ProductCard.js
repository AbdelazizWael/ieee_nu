import React from 'react';
import * as Strap from 'reactstrap';

const ProductCard = (props) => {
    return (
        <div key={props.product.id}>
            <Strap.Card>
                <Strap.CardImg top width="100%" src={props.product.image} alt={props.product.name} />
                <Strap.CardBody>
                    <Strap.CardTitle tag="h4">{props.product.name}</Strap.CardTitle>
                    <Strap.CardSubtitle tag="p" className="text-muted my-1">
                        Categories: {props.product.categories.join(", ")}
                    </Strap.CardSubtitle>
                    <Strap.CardSubtitle tag="p" className="text-muted my-1">
                        <span className="fa fa-sort-numeric-desc"></span> Count: {props.product.count}
                    </Strap.CardSubtitle>
                    <Strap.CardText>{props.product.description}</Strap.CardText>
                    <Strap.CardSubtitle tag="p" className="mb-2">
                        <span className="fa fa-money"></span> Price: {props.product.price}
                    </Strap.CardSubtitle>
                    {
                        props.isAuthenticated
                            ?
                            <Strap.Button color="success" onClick={props.add(props.product)}>
                                <span className="fa fa-plus"></span> Add to Cart
                            </Strap.Button>
                            :
                            <Strap.Button color="success" onClick={props.add(props.product)} disabled>
                                <span className="fa fa-plus"></span> Add to Cart
                            </Strap.Button>
                    }
                </Strap.CardBody>
            </Strap.Card>
        </div>
    );
}

export default ProductCard;
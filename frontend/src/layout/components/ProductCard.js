import React from 'react';
import * as Strap from 'reactstrap';

const ProductCard = (props) => {
    return (
        <div key={props.product.id}>
            {/* <Strap.Card>
                <Strap.CardImg top width="100%" src={props.product.image} alt={props.product.name} />
                <Strap.CardBody>
                    <Strap.CardTitle tag="h4">{props.product.name}</Strap.CardTitle>
                    <Strap.CardSubtitle tag="p" className="text-muted my-1">
                        Categories: {props.product.categories.join(", ")}
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
            </Strap.Card> */}
            <div className="col-lg-4 col-md-6 col-sm-12 mt-4" >
                <div>
                    <div className="card">
                        <div>
                            <div className="discount">
                                <p>10% Sale</p>
                            </div>
                            <img className="card-img-top" width="1000" src={props.product.image} alt={props.product.name} />
                        </div>
                        <div className="card-body">
                            <a href="#"> <h3 className="card-title">{props.product.name}</h3></a>
                            <Strap.CardSubtitle tag="p" className="text-muted my-1">
                                Categories: {props.product.categories.join(", ")}
                            </Strap.CardSubtitle>
                            <h5 className="" style={{ color: 'green' }}>{props.product.price}</h5>
                            <p className="card-text">{props.product.description}</p>
                        </div>
                    </div>
                    {
                        props.isAuthenticated
                            ?
                            <button className="card-btn" onClick={props.add(props.product)}>Add To Cart <i className="fas fa-shopping-cart"></i></button>
                            :
                            <button className="card-btn-notAuthenticated">Add To Cart <i className="fas fa-shopping-cart" onClick={props.add(props.product)} disabled></i></button>
                    }

                </div>
            </div>
        </div>
    );
}

export default ProductCard;
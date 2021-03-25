import React from 'react';
import * as Strap from 'reactstrap';

const ProductCard = (props) => {
    return (
        <div key={props.product.id} className="col-lg-4 col-md-6 col-sm-12 mt-4">
                <div>
                    <div className="card">
                        <div>
                            <div className="discount">
                                <p>10% Sale</p>
                            </div>
                            <div class="embed-responsive embed-responsive-4by3">
                                <img className="card-img-top embed-responsive-item" width="1000" src={props.product.image} alt={props.product.name} />
                            </div>
                            
                        </div>
                        <div className="card-body">
                            <a href="#"> <h3 className="card-title">{props.product.name}</h3></a>
                            <Strap.CardSubtitle tag="p" className="text-muted my-1">
                                Categories: {props.product.categories.join(", ")}
                            </Strap.CardSubtitle>
                            <h5 className="" style={{ color: 'green' }}>{props.product.price}</h5>
                            <div className="description">
                                <p className="card-text">{props.product.description}</p>
                            </div>
                        </div>
                    </div>
                    {
                        props.isAuthenticated
                            ?
                            <button className="card-btn" onClick={props.add(props.product)}>Add To Cart <i className="fas fa-shopping-cart"></i></button>
                            :
                            <button className="card-btn" disabled>Add To Cart <i className="fas fa-shopping-cart" onClick={props.add(props.product)}></i></button>
                    }
                </div>
        </div>
    );
}

export default ProductCard;
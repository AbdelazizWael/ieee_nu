import React from 'react'
import '../../css/master.css'

const ProductCardsMobile = (props) => {
    return (
        <ul key={props.product.id} className="list-group mobile ms-2">
            <li className="list-group-item">
                <div className="row">
                    <div className="col-3">
                        <div class="embed-responsive embed-responsive-4by3 me-4" >
                            <img className="card-img-top embed-responsive-item" width="1000" src={props.product.image} alt={props.product.name}/>
                        </div>
                    </div>
                    <div className="col-4">
                        <a href="#"> <h3 className="card-title" style={{color: '#000'}}>{props.product.name}</h3></a>
                        <h5 className="" style={{ color: 'green', marginTop: '-6px' }}>{props.product.price} LE</h5>
                    </div>
                    <div className="col-5">
                        <button className="card-btn-mobile mt-3" style={{float: 'right'}} onClick={props.add(props.product)}>Add To Cart <i className="fas fa-shopping-cart"></i></button>
                    </div>
                </div>
                
            </li>  
        </ul>
    )
}

export default ProductCardsMobile;
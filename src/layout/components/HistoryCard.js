import React from 'react';
import * as Strap from 'reactstrap';

const HistoryCard = (props) => {

    const products = props.hist.products;
    const _date = new Date(props.hist.verified_on);

    const date = _date.toDateString()

    const renderProducts = products.map(product => {
        return (
            <React.Fragment>
                <Strap.Row className="px-4 py-2">
                    <Strap.Col sm="3">
                        <p className="mb-0"><b>Name:</b> {product.name}</p>
                    </Strap.Col>
                    <Strap.Col sm="3">
                        <p className="mb-0"><b>Count:</b> {product.count}</p>
                    </Strap.Col>
                    <Strap.Col sm="3">
                        <p className="mb-0"><b> Price:</b> {product.price}</p>
                    </Strap.Col>
                    <Strap.Col sm="3">
                        <p className="mb-0"><b>Compound Price:</b> {product.compound_price}</p>
                    </Strap.Col>
                </Strap.Row>
                <hr className="m-1 p-0" />
            </React.Fragment>
        )
    })

    return (
        <div>
            <Strap.Card body className="mb-4" key={props.hist.id} color="white">
                {renderProducts}
                <div className="px-2 my-3">
                    <p><span className="fa fa-money"></span> <b>Full Price:</b> {props.hist.full_price}</p>
                    <p><span className="fa fa-calendar"></span> <b>Verified on:</b> {date}</p>
                </div>
            </Strap.Card>
        </div>
    );
}

export default HistoryCard;
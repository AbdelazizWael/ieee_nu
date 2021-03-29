import React from 'react';
import * as Strap from 'reactstrap';

const ErrorDisplay = (props) => {
    var message;

    if (typeof props.error === 'object') {
        console.log(props.error);
    }

    return (
        <Strap.Row className="my-2">
            <Strap.Col xs="12">
                <Strap.Alert color="danger">
                    <span className="fa fa-warning"></span>
                    {' '}
                    {message}
                </Strap.Alert>
            </Strap.Col>
        </Strap.Row>
    )
}

export default ErrorDisplay;
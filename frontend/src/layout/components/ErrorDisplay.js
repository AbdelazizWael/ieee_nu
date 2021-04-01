import React from 'react';
import * as Strap from 'reactstrap';

const ErrorDisplay = (props) => {
    return (
        <Strap.Row className="my-2">
            <Strap.Col xs="12">
                <Strap.Alert color="danger">
                    <span className="fa fa-warning"></span>
                    {' '}
                    {props.error}
                </Strap.Alert>
            </Strap.Col>
        </Strap.Row>
    )
}

export default ErrorDisplay;
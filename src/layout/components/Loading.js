import React from 'react';
import { Container, Row, Spinner } from 'reactstrap';

const Loading = (props) => {
    return (
        <div>
            <Container>
                <Row className="text-center">
                    <Spinner color="black" className="text-center" />
                </Row>
            </Container>
        </div>
    );
}

export default Loading;
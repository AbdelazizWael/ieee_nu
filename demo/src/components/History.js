import React, { Component } from 'react';
import * as Strap from 'reactstrap';

class History extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    renderHistory = ({ isLoading, error, history }) => {
        if (isLoading) {
            return <Strap.Spinner className="text-center" color="black" />;
        }
        else if (error) {
            return <h4>{error}</h4>;
        }
        else if (history) {
            return (
                <div>
                    {history.map(hist => {
                        return (
                            <Strap.Card body className="my-2" key={hist.id} color="white">
                                <Strap.Row>
                                    <Strap.Col className="align-self-center" sm="7">
                                        <Strap.CardTitle tag="p">{JSON.stringify(hist.products, null, 4)}</Strap.CardTitle>
                                        <Strap.CardSubtitle className="my-2"><span className="fa fa-money"></span> Full Price: {hist.full_price}</Strap.CardSubtitle>
                                    </Strap.Col>
                                    <Strap.Col className="align-self-center" sm="2">
                                    </Strap.Col>
                                </Strap.Row>
                            </Strap.Card>
                        )
                    })
                    }
                </div >
            )
        }
    }

    render() {
        return (
            <div>
                <Strap.Container className="my-5">
                    <Strap.Row>
                        <Strap.Col>
                            <h3 className="px-2 my-1">History</h3>
                        </Strap.Col>
                    </Strap.Row>
                    <hr />
                    <br />
                    {this.renderHistory(this.props.historyState)}
                </Strap.Container>
            </div>
        );
    }
}

export default History;
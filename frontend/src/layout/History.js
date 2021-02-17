import React from 'react';
import * as Strap from 'reactstrap';
import Loading from './components/Loading';
import HistoryCard from './components/HistoryCard';

class History extends React.Component {

    renderHistory = () => {
        const isLoading = this.props.historyState.isLoading;
        const error = this.props.historyState.error;
        const history = this.props.historyState.history.results;

        if (isLoading) {
            return <Loading />;
        }
        else if (error) {
            return <h4>{error}</h4>;
        }
        else if (history) {
            const historyView = history.map(hist => {
                return <HistoryCard hist={hist} />
            });

            return (
                <div>
                    {historyView}
                </div>
            );
        }
    }

    render() {

        return (
            <div>
                <Strap.Container className="my-4">
                    <Strap.Row>
                        <Strap.Col>
                            <h3>History</h3>
                        </Strap.Col>
                    </Strap.Row>

                    <hr />
                    <br />

                    {this.renderHistory()}
                </Strap.Container>
            </div>
        );
    }
}

export default History;
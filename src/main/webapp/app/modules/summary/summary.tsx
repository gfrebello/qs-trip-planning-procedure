import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Card, CardHeader, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap';

import { getSession } from 'app/shared/reducers/authentication';
import { Link } from 'react-router-dom';

export interface ISummaryProps extends StateProps, DispatchProps {}

export class SummaryPage extends React.Component<ISummaryProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSession();
  }

  render() {
    return (
      <div>
        <h1>Summary page</h1>
        <div>
          <p> Welcome to the summary page! </p>

          <p>
            {' '}
            On this page, you can check if all the reservations you chose for your trip are correct. You can, of course, also go back to the
            Trip Planning page.{' '}
          </p>
        </div>
        <Button tag={Link} to="/planner" color="primary">
          Go back to Trip Planning page
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = {
  getSession
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryPage);

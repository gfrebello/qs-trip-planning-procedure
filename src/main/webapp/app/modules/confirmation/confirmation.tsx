import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Card, CardHeader, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap';

import { getSession } from 'app/shared/reducers/authentication';
import { Link } from 'react-router-dom';
import { createTrip } from './confirmation.reducer';

export interface IConfirmationProps extends StateProps, DispatchProps {}

export class ConfirmationPage extends React.Component<IConfirmationProps> {
  componentDidMount() {
    this.props.getSession();
    // Needs to get user info (from account?)
    // Also needs to get seat IDs
    // First thing is to ensure a trip is being created
    // this.props.createTrip();
  }

  render() {
    return (
      <div>
        <h1>Confirmation Page</h1>
        Congratulations! Your payment has been made successfully and your trip has been registered!... Or not, a function needs to be done
        to "check" this.
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  flightReservations: storeState.reservations.reservedFlights
});

const mapDispatchToProps = {
  getSession,
  createTrip
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationPage);

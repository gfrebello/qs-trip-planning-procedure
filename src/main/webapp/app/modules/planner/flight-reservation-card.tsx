import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Card, CardHeader, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap';

import { resetFlightReservations } from '../planner/planner.reducer';

export interface IFlightReservationCardProps extends StateProps, DispatchProps {
  handleShowFlights: Function;
}

export class FlightReservationCard extends React.Component<IFlightReservationCardProps> {
  constructor(props) {
    super(props);
  }
  handleResetFlightReservations = () => {
    this.props.resetFlightReservations();
  };

  showReservedFlights = () => {
    const output = [];
    if (this.props.reservedFlights.length > 0) {
      output.push(<CardText>{'You have a flight, yay'}</CardText>);
      output.push(<Button onClick={this.props.handleShowFlights}>View flights</Button>);
      output.push(<Button onClick={this.handleResetFlightReservations}>Cancel Reservation</Button>);
    } else {
      output.push(<CardText>{'It seems you do not have any flight reservations yet'}</CardText>);
      output.push(<Button onClick={this.props.handleShowFlights}>View flights</Button>);
    }
    return output;
  };

  render() {
    return (
      <Card>
        <CardHeader>Flight Reservation</CardHeader>
        <CardBody>{this.showReservedFlights()}</CardBody>
      </Card>
    );
  }
}

const mapStateToProps = storeState => ({
  reservedFlights: storeState.reservations.reservedFlights
});

const mapDispatchToProps = {
  resetFlightReservations
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightReservationCard);

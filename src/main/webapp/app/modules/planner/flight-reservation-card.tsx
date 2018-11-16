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
    const { reservedFlights } = this.props;
    const output = [];
    if (reservedFlights.length > 0) {
      output.push(
        <Row>
          <Col>Flight</Col>
          <Col>Departure</Col>
          <Col>Arrival</Col>
          <Col>Seats</Col>
        </Row>
      );
      for (const reservation of reservedFlights) {
        const { company, origin, destination, departureDate, arrivalDate, flightCode, departAirport, arrivalAirport } = reservation.flight;
        const depart = new Date(departureDate);
        const dateOfDepart = depart.toLocaleDateString();
        const timeOfDepart = depart.toLocaleTimeString();
        const arrival = new Date(arrivalDate);
        const dateOfArrival = arrival.toLocaleDateString();
        const timeOfArrival = arrival.toLocaleTimeString();
        const seats = [];
        for (const resSeat of reservation.reservedSeats) {
          seats.push(String(resSeat.row) + String(resSeat.number));
        }
        output.push(
          <CardText>
            <ListGroupItem>
              <Row>
                <Col>
                  <Row>
                    <Col>{`${company}`}</Col>
                  </Row>
                  <Row>
                    <Col>{`Flight ${flightCode}`}</Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col>{`${origin} (${departAirport})`}</Col>
                  </Row>
                  <Row>
                    <Col>{`${dateOfDepart} - ${timeOfDepart}`}</Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col>{`${destination} (${arrivalAirport})`}</Col>
                  </Row>
                  <Row>
                    <Col>{`${dateOfArrival} - ${timeOfArrival}`}</Col>
                  </Row>
                </Col>
                <Col>{`${seats}`}</Col>
              </Row>
            </ListGroupItem>
          </CardText>
        );
      }
      output.push(
        <Row>
          <Col sm={{ size: '4', offset: 0 }}>
            <Button color="primary" size="md" onClick={this.props.handleShowFlights}>
              View flights
            </Button>
          </Col>
          <Col sm={{ size: 'auto', offset: 0 }}>
            <Button color="danger" size="md" onClick={this.handleResetFlightReservations}>
              Cancel Reservation
            </Button>
          </Col>
        </Row>
      );
    } else {
      output.push(<CardText>{'It seems you do not have any flight reservations yet'}</CardText>);
      output.push(
        <Button color="primary" onClick={this.props.handleShowFlights}>
          View flights
        </Button>
      );
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

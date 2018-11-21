import './confirmation.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Card, CardHeader, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap';

import { getSession } from 'app/shared/reducers/authentication';
import { Link } from 'react-router-dom';
import { createTrip } from './confirmation.reducer';
import { number } from 'prop-types';

export interface IConfirmationProps extends StateProps, DispatchProps {}

export class ConfirmationPage extends React.Component<IConfirmationProps> {
  componentDidMount() {
    this.props.getSession();

    const tripEntity = {
      numberOfPeople: this.props.numberOfPeople,
      departureDate: this.props.departureDate,
      returnDate: this.props.returnDate,
      origin: this.props.origin,
      destination: this.props.destination,
      user: { id: this.props.account.id }
    };
    const flightReservationEntities = [];
    for (const flightRes of this.props.flightReservations) {
      const seatEntities = [];
      let nExecutive = 0;
      let nEconomic = 0;
      for (const seatRes of flightRes.reservedSeats) {
        if (seatRes.isExecutive) {
          nExecutive += 1;
        } else {
          nEconomic += 1;
        }
        seatEntities.push({ ...seatRes, isReserved: true });
      }
      const fResEnt = {
        numberOfExecutive: nExecutive,
        numberOfEconomic: nEconomic,
        totalPrice: flightRes.price,
        flight: { id: flightRes.flight.id }
      };
      flightReservationEntities.push({ flightReservation: fResEnt, reservationSeats: seatEntities });
    }
    this.props.createTrip(tripEntity, flightReservationEntities);
  }

  render() {
    return (
      <div>
        <Row>
          <Col className="confirmText">
            <h1>Thank you!</h1>
          </Col>
        </Row>
        <Row>
          <img className="centerImg" src={require('../../../static/images/greenok.png')} />
        </Row>
        <Row>
          <Col className="confirmText">
            Your trip has been successfully planned! To access it, go to the "My Trips" section on the top of the page. <br />
            <br />
            Have a good trip! <br />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  flightReservations: storeState.reservations.reservedFlights,
  numberOfPeople: storeState.home.nPassengers,
  departureDate: storeState.home.departDate,
  returnDate: storeState.home.returnDate,
  origin: storeState.home.origin,
  destination: storeState.home.destination
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

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Card, CardHeader, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap';

import { getSession } from 'app/shared/reducers/authentication';
import { Link } from 'react-router-dom';
import { createTrip } from './confirmation.reducer';
import { number } from 'prop-types';
import hotel from 'app/entities/hotel/hotel';

export interface IConfirmationProps extends StateProps, DispatchProps {}

export class ConfirmationPage extends React.Component<IConfirmationProps> {
  componentDidMount() {
    this.props.getSession();
    // Needs to get user info (from account?)
    // Also needs to get seat IDs
    // First thing is to ensure a trip is being created
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
    const hotelReservationEntities = [];
    for (const hotelRes of this.props.hotelReservations) {
      const roomEntities = [];
      for (const roomRes of hotelRes.reservedRooms) {
        roomEntities.push({ ...roomRes, isReserved: true });
      }
      const hotelResEnt = {
        numberOfPeople: this.props.numberOfPeople,
        checkinDate: hotelRes.checkinDate,
        checkoutDate: hotelRes.checkoutDate
      };
      hotelReservationEntities.push({ hotelReservation: hotelResEnt, reservationRooms: roomEntities });
    }

    this.props.createTrip(tripEntity, flightReservationEntities, hotelReservationEntities);
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
  flightReservations: storeState.reservations.reservedFlights,
  hotelReservations: storeState.reservations.reservedHotels,
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

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getTrips, getFlightReservations, getSeats, reset } from './mytrips.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import trip from 'app/entities/trip/trip';

export interface IMyTripsProps extends StateProps, DispatchProps {}

export class MyTrips extends React.Component<IMyTripsProps> {
  componentDidMount() {
    this.props.reset();
    this.props.getTrips();
    this.props.getFlightReservations();
    this.props.getSeats();
  }

  getExecutiveSeats = resId => {
    const { seatList } = this.props;
    const executiveSeats = [];
    for (const seat of seatList) {
      if (seat.flightReservation.id === resId && seat.isExecutive) {
        executiveSeats.push(String(seat.row) + String(seat.number));
      }
    }
    return executiveSeats;
  };

  getEconomicSeats = resId => {
    const { seatList } = this.props;
    const economicSeats = [];
    for (const seat of seatList) {
      if (seat.flightReservation.id === resId && !seat.isExecutive) {
        economicSeats.push(String(seat.row) + String(seat.number));
      }
    }
    return economicSeats;
  };

  render() {
    const { tripList, flightReservationsList } = this.props;
    return (
      <div>
        <h2 id="trip-heading">My Trips</h2>
        <div className="table-responsive">
          {tripList.map((trip, i) => (
            <div>
              Trip ID: {trip.id}
              Number Of People: {trip.numberOfPeople}
              Departure Date: <TextFormat type="date" value={trip.departureDate} format={APP_LOCAL_DATE_FORMAT} />
              Return Date: <TextFormat type="date" value={trip.returnDate} format={APP_LOCAL_DATE_FORMAT} />
              Origin: {trip.origin}
              Destination: {trip.destination}
              {flightReservationsList.map((freservation, j) => {
                if (freservation.trip.id === trip.id) {
                  const executiveSeats = this.getExecutiveSeats(freservation.id);
                  const economicSeats = this.getEconomicSeats(freservation.id);
                  return (
                    <div>
                      Reservation ID: {freservation.id}
                      Executive Seats: {freservation.numberOfExecutive} {executiveSeats}
                      Economic Seats: {freservation.numberOfEconomic} {economicSeats}
                      Total Price: {freservation.totalPrice}
                      Flight: {freservation.flight.company} {freservation.flight.flightCode}
                      From: {freservation.flight.origin} {freservation.flight.departAirport} {freservation.flight.departureDate}
                      To: {freservation.flight.destination} {freservation.flight.arrivalAirport} {freservation.flight.arrivalDate}
                    </div>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  tripList: storeState.mytrips.trips,
  flightReservationsList: storeState.mytrips.flightReservations,
  seatList: storeState.mytrips.seatList
});

const mapDispatchToProps = {
  getTrips,
  getFlightReservations,
  getSeats,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTrips);

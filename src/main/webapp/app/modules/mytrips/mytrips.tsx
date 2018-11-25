import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getTrips, getFlightReservations, getSeats, getHotelReservations, getHotelRooms, reset } from './mytrips.reducer';
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
    this.props.getHotelReservations();
    this.props.getHotelRooms();
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

  getHotel = resId => {
    const { roomsList } = this.props;
    for (const room of roomsList) {
      console.log(room.hotelReservation.id, resId);
      if (room.hotelReservation.id === resId) {
        return room.hotel;
      }
    }
  };

  render() {
    const { tripList, flightReservationsList, hotelReservationsList } = this.props;
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
                if (freservation.trip && freservation.trip.id === trip.id) {
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
              {hotelReservationsList.map((hreservation, k) => {
                if (hreservation.trip && hreservation.trip.id === trip.id) {
                  console.log(hreservation);
                  const currentHotel = this.getHotel(hreservation.id);
                  return (
                    <div>
                      HReservation ID: {hreservation.id}
                      Hotel Name: {currentHotel.name}
                      Address: {currentHotel.address}
                      Checkin Date: {hreservation.checkinDate}
                      Checkout Date: {hreservation.checkoutDate}
                      Price: {hreservation.totalPrice}
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
  hotelReservationsList: storeState.mytrips.hotelReservations,
  seatList: storeState.mytrips.seatList,
  roomsList: storeState.mytrips.roomsList
});

const mapDispatchToProps = {
  getTrips,
  getFlightReservations,
  getSeats,
  getHotelReservations,
  getHotelRooms,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTrips);

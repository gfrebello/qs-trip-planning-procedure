import './mytrips.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Card, CardBody, CardTitle, CardHeader } from 'reactstrap';
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
      if (seat.flightReservation && seat.flightReservation.id === resId && seat.isExecutive) {
        executiveSeats.push(String(seat.row) + String(seat.number));
      }
    }
    return executiveSeats;
  };

  getEconomicSeats = resId => {
    const { seatList } = this.props;
    const economicSeats = [];
    for (const seat of seatList) {
      if (seat.flightReservation && seat.flightReservation.id === resId && !seat.isExecutive) {
        economicSeats.push(String(seat.row) + String(seat.number));
      }
    }
    return economicSeats;
  };

  getHotel = hr => {
    for (const room of hr.hotelRooms) {
      return room.hotel;
    }
  };

  render() {
    const { tripList, flightReservationsList, hotelReservationsList } = this.props;
    return (
      <div>
        <h2 id="trip-heading">My Trips</h2>
        <div className="table-responsive">
          {tripList.map((trip, i) => (
            <Card className="trip-card">
              <CardTitle>Trip ID: {trip.id}</CardTitle>
              <CardBody>
                <CardHeader className="section-title">Trip Information</CardHeader>
                <Row>
                  <Col>Number Of People: {trip.numberOfPeople}</Col>
                  <Col>
                    Departure Date: <TextFormat type="date" value={trip.departureDate} format={APP_LOCAL_DATE_FORMAT} />
                  </Col>
                  <Col>
                    Return Date: <TextFormat type="date" value={trip.returnDate} format={APP_LOCAL_DATE_FORMAT} />
                  </Col>
                  <Col>Origin: {trip.origin}</Col>
                  <Col>Destination: {trip.destination}</Col>
                </Row>
              </CardBody>
              <CardBody>
                <CardHeader className="section-title">Flight Reservations</CardHeader>
                {flightReservationsList.map((freservation, j) => {
                  if (freservation.trip && freservation.trip.id === trip.id) {
                    const executiveSeats = this.getExecutiveSeats(freservation.id);
                    const economicSeats = this.getEconomicSeats(freservation.id);
                    return (
                      <Card className="reservation-card">
                        <CardTitle>Reservation ID: {freservation.id}</CardTitle>
                        <CardBody>
                          <Col>
                            Executive Seats: {freservation.numberOfExecutive} {executiveSeats}
                          </Col>
                          <Col>
                            Economic Seats: {freservation.numberOfEconomic} {economicSeats}
                          </Col>
                          <Col>Total Price: {freservation.totalPrice}</Col>
                          <Col>
                            Flight: {freservation.flight.company} {freservation.flight.flightCode}
                          </Col>
                          <Col>
                            From: {freservation.flight.origin} {freservation.flight.departAirport} {freservation.flight.departureDate}
                          </Col>
                          <Col>
                            To: {freservation.flight.destination} {freservation.flight.arrivalAirport} {freservation.flight.arrivalDate}
                          </Col>
                        </CardBody>
                      </Card>
                    );
                  }
                })}
              </CardBody>
              <CardBody>
                <CardHeader className="section-title">Hotel Reservations</CardHeader>
                {hotelReservationsList.map((hreservation, k) => {
                  if (hreservation.trip && hreservation.trip.id === trip.id) {
                    const currentHotel = this.getHotel(hreservation);
                    return (
                      <Card className="reservation-card">
                        <CardTitle>Reservation ID: {hreservation.id}</CardTitle>
                        <CardBody>
                          <Col>Hotel Name: {currentHotel.name}</Col>
                          <Col>Address: {currentHotel.address}</Col>
                          <Col>Checkin Date: {hreservation.checkinDate}</Col>
                          <Col>Checkout Date: {hreservation.checkoutDate}</Col>
                          <Col>Price: {hreservation.totalPrice}</Col>
                        </CardBody>
                      </Card>
                    );
                  }
                })}
              </CardBody>
            </Card>
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

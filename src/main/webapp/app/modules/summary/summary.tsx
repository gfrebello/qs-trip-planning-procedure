import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Card, CardHeader, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap';

import { getSession } from 'app/shared/reducers/authentication';
import { Link } from 'react-router-dom';

export interface ISummaryProps extends StateProps, DispatchProps {}

export class SummaryPage extends React.Component<ISummaryProps> {
  state = {
    totalPrice: 0
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSession();
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    let total = 0;
    const { reservedFlights, reservedHotels, chosenAttractions, rentedCars, boughtInsurances } = this.props;
    for (const reservation of reservedFlights) {
      const { price } = reservation.flight;
      total += price;
    }
    this.setState({
      totalPrice: total
    });
  }

  renderReservedFlights = () => {
    const { reservedFlights } = this.props;
    const output = [];
    if (reservedFlights.length > 0) {
      output.push(
        <Row>
          <Col xs="2">Flight</Col>
          <Col xs="2">Departure</Col>
          <Col xs="2">Arrival</Col>
          <Col xs="2">Seats</Col>
          <Col xs="4">Price</Col>
        </Row>
      );
      for (const reservation of reservedFlights) {
        const {
          company,
          origin,
          destination,
          departureDate,
          arrivalDate,
          flightCode,
          departAirport,
          arrivalAirport,
          price
        } = reservation.flight;
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
            <Row>
              <Col xs="8">
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
              </Col>
              <Col xs="4">{`R$${price}`}</Col>
            </Row>
          </CardText>
        );
      }
    } else {
      output.push(<CardText>No flights reserved</CardText>);
    }
    return output;
  };

  render() {
    const flights = this.renderReservedFlights();

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
        <Row>
          <Col>
            <Card>
              <CardHeader>Flights</CardHeader>
              <CardBody>{flights}</CardBody>
              <CardHeader>Hotels</CardHeader>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            Total trip price: R$
            {this.state.totalPrice}
          </Col>
        </Row>
        <Button tag={Link} to="/planner" color="primary">
          Go back to Trip Planning page
        </Button>
        <Button tag={Link} to="/passengerinfo" color="primary">
          Go to user info page
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  reservedFlights: storeState.reservations.reservedFlights,
  reservedHotels: storeState.reservations.reservedHotels,
  chosenAttractions: storeState.reservations.chosenAttractions,
  rentedCars: storeState.reservations.rentedCars,
  boughtInsurances: storeState.reservations.boughtInsurances
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

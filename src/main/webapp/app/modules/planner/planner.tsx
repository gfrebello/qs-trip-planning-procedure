import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Card, CardHeader, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap';

import { getSession } from 'app/shared/reducers/authentication';
import { resetRedirect } from '../home/home.reducer';

import PlannerEditModal from './planner-edit-modal';
import FlightList from './flight-list';
import HotelList from './hotel-list';
import FlightReservationCard from './flight-reservation-card';
import HotelReservationCard from './hotel-reservation-card';
import AttractionReservationCard from './attraction-reservation-card';
import CarRentalCard from './car-rental-card';
import InsuranceCard from './insurance-card';
import { Link } from 'react-router-dom';
import Seatmap from '../seatmap/flight-seatmap';
import RoomSelectionPage from '../roomSelection/roomSelection';

import { reset } from './planner.reducer';

export interface IPlannerProps extends StateProps, DispatchProps {}

export class PlannerPage extends React.Component<IPlannerProps> {
  state = {
    showModal: false,
    showSeatmap: false,
    showRoomSelection: false,
    showFlightList: true,
    showHotelList: false,
    showAttractionList: false,
    showCarRentalList: false,
    showInsuranceList: false
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSession();
    this.props.resetRedirect();
  }

  componentWillReceiveProps(nextProps) {
    const { origin, destination, departDate, returnDate, nPassengers } = this.props;
    if (
      nextProps.origin !== origin ||
      nextProps.destination !== destination ||
      nextProps.departDate !== departDate ||
      nextProps.returnDate !== returnDate ||
      nextProps.nPassengers !== nPassengers
    ) {
      this.props.reset();
    }
  }

  componentDidUpdate(prevProps: IPlannerProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({ showModal: this.state.showModal });
    }
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };
  handleOpen = () => {
    this.setState({ showModal: true });
  };

  handleCloseSeatmap = () => {
    this.setState({ showSeatmap: false });
  };
  handleOpenSeatmap = rSelected => {
    this.setState({ showSeatmap: true });
  };

  handleCloseRoomSelection = () => {
    this.setState({ showRoomSelection: false });
  };
  handleOpenRoomSelection = () => {
    this.setState({ showRoomSelection: true });
  };

  handleShowFlights = () => {
    this.setState({
      showFlightList: true,
      showHotelList: false,
      showAttractionList: false,
      showCarRentalList: false,
      showInsuranceList: false
    });
  };
  handleShowHotels = () => {
    this.setState({
      showFlightList: false,
      showHotelList: true,
      showAttractionList: false,
      showCarRentalList: false,
      showInsuranceList: false
    });
  };
  handleShowAttractions = () => {
    this.setState({
      showFlightList: false,
      showHotelList: false,
      showAttractionList: true,
      showCarRentalList: false,
      showInsuranceList: false
    });
  };
  handleShowCarRentals = () => {
    this.setState({
      showFlightList: false,
      showHotelList: false,
      showAttractionList: false,
      showCarRentalList: true,
      showInsuranceList: false
    });
  };
  handleShowInsurance = () => {
    this.setState({
      showFlightList: false,
      showHotelList: false,
      showAttractionList: false,
      showCarRentalList: false,
      showInsuranceList: true
    });
  };

  render() {
    const { origin, destination, departDate, returnDate, nPassengers } = this.props;
    return (
      <div>
        <h1>Planning page</h1>
        <div>
          <p> Welcome to the planning page! </p>

          <p>
            {' '}
            On this page, you can browse and select available flights, hotel rooms, attractions, car rentals and insurance for your chosen
            trip. You can also filter your options according to your personal preferences.{' '}
          </p>

          <p> When you're all set, click the "Finish Planning" button on the bottom of this page. </p>
        </div>
        <div>
          <h4>Information about your current trip:</h4>
          <ul>
            <li>Origin: {origin}</li>
            <li>Destination: {destination}</li>
            <li>Departure Date: {departDate}</li>
            <li>Return Date: {returnDate}</li>
            <li>Number of Passengers: {nPassengers}</li>
          </ul>

          <Button className="trip-button" color="primary" onClick={this.handleOpen}>
            Edit Itinerary
          </Button>
          <br />

          <PlannerEditModal showModal={this.state.showModal} handleClose={this.handleClose} />
          <Seatmap showSeatmap={this.state.showSeatmap} handleClose={this.handleCloseSeatmap} />
          <RoomSelectionPage showRoomSelection={this.state.showRoomSelection} handleClose={this.handleCloseRoomSelection} />

          <h2>Plan your trip</h2>
          <div>
            <Row>
              <Col xs="4">
                <Row>
                  <Col xs="11">
                    <FlightReservationCard handleShowFlights={this.handleShowFlights} />
                  </Col>
                </Row>
                <Row>
                  <Col xs="11">
                    <HotelReservationCard handleShowHotels={this.handleShowHotels} />
                  </Col>
                </Row>
                <Row>
                  <Col xs="11">
                    <AttractionReservationCard handleShowAttractions={this.handleShowAttractions} />
                  </Col>
                </Row>
                <Row>
                  <Col xs="11">
                    <CarRentalCard handleShowCarRentals={this.handleShowCarRentals} />
                  </Col>
                </Row>
                <Row>
                  <Col xs="11">
                    <InsuranceCard handleShowInsurance={this.handleShowInsurance} />
                  </Col>
                </Row>
              </Col>
              <Col xs="8">
                {this.state.showFlightList ? (
                  <FlightList handleOpenSeatmap={this.handleOpenSeatmap} />
                ) : this.state.showHotelList ? (
                  <HotelList handleOpenRoomSelection={this.handleOpenRoomSelection} />
                ) : (
                  'Not implemented yet'
                )}
              </Col>
            </Row>
          </div>
          <Row>
            <Col>
              <Button className="trip-next-button" tag={Link} to="/summary" color="primary">
                Go to Trip Summary Page
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  origin: storeState.home.origin,
  destination: storeState.home.destination,
  departDate: storeState.home.departDate,
  returnDate: storeState.home.returnDate,
  nPassengers: storeState.home.nPassengers
});

const mapDispatchToProps = {
  getSession,
  resetRedirect,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlannerPage);

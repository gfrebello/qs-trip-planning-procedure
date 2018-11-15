import './planner.scss';

import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from 'reactstrap';

import { updateRSelected, updatePassengersEconomic, updatePassengersExecutive } from './planner.reducer';
import { getEntitiesByDateOriginDestination, getEntities } from '../../entities/flight/flight.reducer';

export interface IFlightListProps extends StateProps, DispatchProps {
  handleOpenSeatmap: Function;
}

export class FlightList extends React.Component<IFlightListProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { nPassengers, departDate, origin, destination } = this.props;
    this.props.updatePassengersEconomic(Number(nPassengers));
    this.props.updatePassengersExecutive(Number(0));
    if (departDate) {
      const qDate = departDate + 'T00:00:00Z';
      this.props.getEntitiesByDateOriginDestination(qDate, origin, destination);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.nPassengers !== this.props.nPassengers ||
      nextProps.departDate !== this.props.departDate ||
      nextProps.origin !== this.props.origin ||
      nextProps.destination !== this.props.destination
    ) {
      const { nPassengers, departDate, origin, destination } = nextProps;
      this.props.updatePassengersEconomic(Number(nPassengers));
      this.props.updatePassengersExecutive(Number(0));
      if (departDate) {
        const qDate = departDate + 'T00:00:00Z';
        this.props.getEntitiesByDateOriginDestination(qDate, origin, destination);
      }
    }
  }

  onRadioBtnClick = rSelected => {
    this.props.updateRSelected(rSelected);
  };

  handleChooseSeats = () => {
    if (this.props.rSelected !== -1) {
      this.props.handleOpenSeatmap();
    } else {
      alert('Please select a flight first!');
    }
  };

  handleChangeExecutive = e => {
    const { nPassengers } = this.props;
    const nExecutive = e.target.value > nPassengers ? nPassengers : e.target.value;
    const nEconomic = nPassengers - nExecutive;
    this.props.updatePassengersEconomic(nEconomic);
    this.props.updatePassengersExecutive(nExecutive);
  };

  createFlightList = () => {
    const { flightList } = this.props;
    const list = [];
    const items = [];
    // Loop to create children
    items.push(
      <Row>
        <Col>Flight Company</Col>
        <Col>Departure</Col>
        <Col>Arrival</Col>
        <Col>Price</Col>
      </Row>
    );
    items.push(<br />);
    for (let j = 0; j < flightList.length; j++) {
      const onRadioBtnClick = this.onRadioBtnClick.bind(this, j);
      const depart = new Date(flightList[j].departureDate);
      const departDate = depart.toLocaleDateString();
      const departTime = depart.toLocaleTimeString();
      const arrival = new Date(flightList[j].arrivalDate);
      const arrivalDate = arrival.toLocaleDateString();
      const arrivalTime = arrival.toLocaleTimeString();
      items.push(
        <ListGroupItem className="list-item" outline onClick={onRadioBtnClick} active={this.props.rSelected === j}>
          <Row>
            <Col>{`${flightList[j].company}`}</Col>
            <Col>
              <Row>
                <Col>{`${flightList[j].origin} (${flightList[j].departAirport})`}</Col>
              </Row>
              <Row>
                <Col>{`${departDate} - ${departTime}`}</Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>{`${flightList[j].destination} (${flightList[j].arrivalAirport})`}</Col>
              </Row>
              <Row>
                <Col>{`${arrivalDate} - ${arrivalTime}`}</Col>
              </Row>
            </Col>
            <Col>{`R$${flightList[j].price}`}</Col>
          </Row>
        </ListGroupItem>
      );
    }
    // Create the parent and add the children
    list.push(<ListGroup>{items}</ListGroup>);
    return list;
  };

  render() {
    return (
      <Card>
        <CardBody>
          <Row>
            <Col sm="4">
              <InputGroup>
                <InputGroupAddon addonType="prepend">Max Price</InputGroupAddon>
                <Input name="maxPrice" id="maxPrice" placeholder="-" />
              </InputGroup>
            </Col>
            <Col sm="4">
              <InputGroupAddon addonType="prepend">Number of executive passengers</InputGroupAddon>
              <InputGroup>
                <Input
                  type="number"
                  name="nExecutive"
                  id="nExecutive"
                  value={this.props.nPassengersExecutive}
                  onChange={this.handleChangeExecutive}
                />
              </InputGroup>
            </Col>
            <Col sm="4">
              <InputGroup>
                <InputGroupAddon addonType="prepend">Departure Time</InputGroupAddon>
                <Input type="time" name="minTime" id="minTime" placeholder="time placeholder" />
              </InputGroup>
            </Col>
          </Row>
        </CardBody>
        <CardBody>
          <Row>
            <Col sm="12">{this.createFlightList()}</Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Button onClick={this.handleChooseSeats}>Select seats</Button>
        </CardFooter>
      </Card>
    );
  }
}

const mapStateToProps = storeState => ({
  nPassengers: storeState.home.nPassengers,
  nPassengersEconomic: storeState.reservations.nPassengersEconomic,
  nPassengersExecutive: storeState.reservations.nPassengersExecutive,
  rSelected: storeState.reservations.rSelected,
  origin: storeState.home.origin,
  destination: storeState.home.destination,
  departDate: storeState.home.departDate,
  flightList: storeState.flight.entities
});

const mapDispatchToProps = {
  updateRSelected,
  updatePassengersEconomic,
  updatePassengersExecutive,
  getEntitiesByDateOriginDestination,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightList);

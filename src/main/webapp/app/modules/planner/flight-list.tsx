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

export interface IFlightListProps extends StateProps, DispatchProps {
  handleOpenSeatmap: Function;
}

export class FlightList extends React.Component<IFlightListProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { nPassengers } = this.props;
    if (!this.checkTotalPassengers()) {
      this.props.updatePassengersEconomic(Number(nPassengers));
      this.props.updatePassengersExecutive(Number(0));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.nPassengers !== this.props.nPassengers) {
      this.props.updatePassengersEconomic(Number(nextProps.nPassengers));
      this.props.updatePassengersExecutive(Number(0));
    }
  }

  checkTotalPassengers = () => {
    const { nPassengers, nPassengersExecutive, nPassengersEconomic } = this.props;
    return nPassengersExecutive + nPassengersEconomic === nPassengers;
  };

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
    const list = [];
    const items = [];
    // Loop to create children
    for (let j = 0; j < 3; j++) {
      items.push(
        <ListGroupItem className="list-item" outline onClick={() => this.onRadioBtnClick(j)} active={this.props.rSelected === j}>
          <Row>
            <Col>{`Flight ${j + 1} company`}</Col>
            <Col>{`Flight ${j + 1} time`}</Col>
            <Col>{`Flight ${j + 1} price`}</Col>
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
  rSelected: storeState.reservations.rSelected
});

const mapDispatchToProps = { updateRSelected, updatePassengersEconomic, updatePassengersExecutive };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightList);

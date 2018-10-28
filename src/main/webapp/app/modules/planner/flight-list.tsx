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

import { addSelectedFlight } from './planner.reducer';

export interface IFlightListProps extends StateProps, DispatchProps {}

export class FlightList extends React.Component<IFlightListProps> {
  state = {
    rSelected: -1
  };
  constructor(props) {
    super(props);
  }

  onRadioBtnClick = rSelected => {
    this.setState({ rSelected });
  };

  handleAddSelection = () => {
    if (this.state.rSelected !== -1) {
      this.props.addSelectedFlight(this.state.rSelected);
    } else {
      alert('Please select a flight first!');
    }
  };

  createFlightList = () => {
    const list = [];
    const items = [];
    // Loop to create children
    for (let j = 0; j < 3; j++) {
      items.push(
        <ListGroupItem className="list-item" outline onClick={() => this.onRadioBtnClick(j)} active={this.state.rSelected === j}>
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
              <InputGroup>
                <Input type="checkbox" name="customerClass" id="customerClass" /> Executive
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
          <Button onClick={this.handleAddSelection}>Add selected flight</Button>
        </CardFooter>
      </Card>
    );
  }
}

const mapStateToProps = storeState => ({
  // origin: storeState.home.origin,
  // destination: storeState.home.destination,
  // departDate: storeState.home.departDate,
  // returnDate: storeState.home.returnDate,
  // nPassengers: storeState.home.nPassengers
});

const mapDispatchToProps = { addSelectedFlight };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightList);

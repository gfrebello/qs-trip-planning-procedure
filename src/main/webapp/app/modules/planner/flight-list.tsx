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

export interface IFlightListProps extends StateProps, DispatchProps {}

export class FlightList extends React.Component<IFlightListProps> {
  constructor(props) {
    super(props);
  }

  createFlightList = () => {
    const list = [];
    const items = [];
    // Loop to create children
    for (let j = 0; j < 3; j++) {
      items.push(
        <ListGroupItem>
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
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Max Price</InputGroupAddon>
                <Input name="maxPrice" id="maxPrice" placeholder="-" />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <Input type="checkbox" name="customerClass" id="customerClass" /> Executive
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Departure Time</InputGroupAddon>
                <Input type="time" name="minTime" id="minTime" placeholder="time placeholder" />
              </InputGroup>
            </Col>
          </Row>
        </CardBody>
        <CardBody>{this.createFlightList()}</CardBody>
        <CardFooter>
          <Button>Add selected flight</Button>
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

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightList);

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Card, CardHeader, CardBody, CardText, CardFooter, ListGroup, ListGroupItem } from 'reactstrap';

export interface IHotelListProps extends StateProps, DispatchProps {}

export class HotelList extends React.Component<IHotelListProps> {
  constructor(props) {
    super(props);
  }

  createHotelList = () => {
    const list = [];
    const items = [];
    // Loop to create children
    for (let j = 0; j < 3; j++) {
      items.push(
        <ListGroupItem>
          <Row>
            <Col>{`Hotel ${j + 1} company`}</Col>
            <Col>{`Hotel ${j + 1} days`}</Col>
            <Col>{`Hotel ${j + 1} price`}</Col>
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
      <div>
        <Card>
          <CardBody>Choosable filters will go here</CardBody>
          <CardBody>{this.createHotelList()}</CardBody>
          <CardFooter>
            <Button>Add selected hotel</Button>
          </CardFooter>
        </Card>
      </div>
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
)(HotelList);

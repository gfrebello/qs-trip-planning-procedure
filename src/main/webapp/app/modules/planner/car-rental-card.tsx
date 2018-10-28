import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Card, CardHeader, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap';

import { resetCarRentalReservations } from '../planner/planner.reducer';

export interface ICarRentalCardProps extends StateProps, DispatchProps {
  handleShowCarRentals: Function;
}

export class CarRentalCard extends React.Component<ICarRentalCardProps> {
  constructor(props) {
    super(props);
  }
  handleResetCarRentalReservations = () => {
    this.props.resetCarRentalReservations();
  };

  showRentedCars = () => {
    const output = [];
    if (this.props.rentedCars.length > 0) {
      output.push(<CardText>{'You have rented a car, yay'}</CardText>);
      output.push(
        <Row>
          <Col sm={{ size: '4', offset: 0 }}>
            <Button color="primary" size="md" onClick={this.props.handleShowCarRentals}>
              View cars
            </Button>
          </Col>
          <Col sm={{ size: 'auto', offset: 0 }}>
            <Button color="danger" size="md" onClick={this.handleResetCarRentalReservations}>
              Cancel Reservation
            </Button>
          </Col>
        </Row>
      );
    } else {
      output.push(<CardText>{'It seems you do not have any rented cars yet'}</CardText>);
      output.push(
        <Button color="primary" onClick={this.props.handleShowCarRentals}>
          View cars
        </Button>
      );
    }
    return output;
  };

  render() {
    return (
      <Card>
        <CardHeader>Car Rentals</CardHeader>
        <CardBody>{this.showRentedCars()}</CardBody>
      </Card>
    );
  }
}

const mapStateToProps = storeState => ({
  rentedCars: storeState.reservations.rentedCars
});

const mapDispatchToProps = {
  resetCarRentalReservations
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarRentalCard);

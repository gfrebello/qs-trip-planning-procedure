import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Card, CardHeader, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap';

import { resetHotelReservations } from '../planner/planner.reducer';

export interface IHotelReservationCardProps extends StateProps, DispatchProps {
  handleShowHotels: Function;
}

export class HotelReservationCard extends React.Component<IHotelReservationCardProps> {
  constructor(props) {
    super(props);
  }
  handleResetHotelReservations = () => {
    this.props.resetHotelReservations();
  };

  showReservedHotels = () => {
    const output = [];
    if (this.props.reservedHotels.length > 0) {
      output.push(<CardText>{'You have a hotel reservation, yay'}</CardText>);
      output.push(
        <Row>
          <Col sm={{ size: '4', offset: 0 }}>
            <Button color="primary" size="md" onClick={this.props.handleShowHotels}>
              View Hotels
            </Button>
          </Col>
          <Col sm={{ size: 'auto', offset: 0 }}>
            <Button color="danger" size="md" onClick={this.handleResetHotelReservations}>
              Cancel Reservation
            </Button>
          </Col>
        </Row>
      );
    } else {
      output.push(<CardText>{'It seems you do not have any hotel reservations yet'}</CardText>);
      output.push(
        <Button color="primary" onClick={this.props.handleShowHotels}>
          View Hotels
        </Button>
      );
    }
    return output;
  };

  render() {
    return (
      <Card>
        <CardHeader>Hotel Reservation</CardHeader>
        <CardBody>{this.showReservedHotels()}</CardBody>
      </Card>
    );
  }
}

const mapStateToProps = storeState => ({
  reservedHotels: storeState.reservations.reservedHotels
});

const mapDispatchToProps = {
  resetHotelReservations
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelReservationCard);

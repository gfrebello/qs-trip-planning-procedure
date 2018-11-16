import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Card, CardHeader, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap';

import { resetAttractionReservations } from '../planner/planner.reducer';

export interface IAttractionReservationCardProps extends StateProps, DispatchProps {
  handleShowAttractions: Function;
}

export class AttractionReservationCard extends React.Component<IAttractionReservationCardProps> {
  constructor(props) {
    super(props);
  }
  handleResetAttractionReservations = () => {
    this.props.resetAttractionReservations();
  };

  showReservedAttractions = () => {
    const output = [];
    if (this.props.chosenAttractions.length > 0) {
      output.push(<CardText>{'You have an attraction reservation, yay'}</CardText>);
      output.push(
        <Row>
          <Col sm={{ size: '4', offset: 0 }}>
            <Button color="primary" size="md" onClick={this.props.handleShowAttractions}>
              View Attractions
            </Button>
          </Col>
          <Col sm={{ size: 'auto', offset: 0 }}>
            <Button color="danger" size="md" onClick={this.handleResetAttractionReservations}>
              Cancel Reservation
            </Button>
          </Col>
        </Row>
      );
    } else {
      output.push(<CardText>{'It seems you do not have any attraction reservations yet'}</CardText>);
      output.push(
        <Button color="primary" onClick={this.props.handleShowAttractions}>
          View Attractions
        </Button>
      );
    }
    return output;
  };

  render() {
    return (
      <Card>
        <CardHeader>Attraction Reservation</CardHeader>
        <CardBody>{this.showReservedAttractions()}</CardBody>
      </Card>
    );
  }
}

const mapStateToProps = storeState => ({
  chosenAttractions: storeState.reservations.chosenAttractions
});

const mapDispatchToProps = {
  resetAttractionReservations
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttractionReservationCard);

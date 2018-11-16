import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Card, CardHeader, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap';

import { resetInsuranceReservations } from '../planner/planner.reducer';

export interface IInsuranceCardProps extends StateProps, DispatchProps {
  handleShowInsurance: Function;
}

export class InsuranceReservationCard extends React.Component<IInsuranceCardProps> {
  constructor(props) {
    super(props);
  }
  handleResetInsuranceReservations = () => {
    this.props.resetInsuranceReservations();
  };

  showInsurances = () => {
    const output = [];
    if (this.props.boughtInsurances.length > 0) {
      output.push(<CardText>{'You have an insurance, yay'}</CardText>);
      output.push(
        <Row>
          <Col sm={{ size: '4', offset: 0 }}>
            <Button color="primary" size="md" onClick={this.props.handleShowInsurance}>
              View insurances
            </Button>
          </Col>
          <Col sm={{ size: 'auto', offset: 0 }}>
            <Button color="danger" size="md" onClick={this.handleResetInsuranceReservations}>
              Cancel insurance
            </Button>
          </Col>
        </Row>
      );
    } else {
      output.push(<CardText>{'It seems you do not have any insurances yet'}</CardText>);
      output.push(
        <Button color="primary" onClick={this.props.handleShowInsurance}>
          View cars
        </Button>
      );
    }
    return output;
  };

  render() {
    return (
      <Card>
        <CardHeader>Insurance Reservation</CardHeader>
        <CardBody>{this.showInsurances()}</CardBody>
      </Card>
    );
  }
}

const mapStateToProps = storeState => ({
  boughtInsurances: storeState.reservations.boughtInsurances
});

const mapDispatchToProps = {
  resetInsuranceReservations
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsuranceReservationCard);

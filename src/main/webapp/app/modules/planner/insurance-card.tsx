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
      output.push(<Button onClick={this.props.handleShowInsurance}>View insurances</Button>);
      output.push(<Button onClick={this.handleResetInsuranceReservations}>Cancel Reservation</Button>);
    } else {
      output.push(<CardText>{'It seems you do not have any insurances yet'}</CardText>);
      output.push(<Button onClick={this.props.handleShowInsurance}>View insurances</Button>);
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

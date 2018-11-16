import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Card, CardHeader, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap';

import { getSession } from 'app/shared/reducers/authentication';
import { Link } from 'react-router-dom';

export interface IPaymentProps extends StateProps, DispatchProps {}

export class PaymentPage extends React.Component<IPaymentProps> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    return (
      <div>
        <h1>Payment page</h1>
        <Button tag={Link} to="/passengerinfo" color="primary">
          Go back to passenger info page
        </Button>
        <Button tag={Link} to="/confirmation" color="primary">
          Confirm payment
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = {
  getSession
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentPage);

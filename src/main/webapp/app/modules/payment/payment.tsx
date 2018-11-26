import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Card, CardHeader, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap';
import { AvForm, AvRadio, AvRadioGroup, AvField } from 'availity-reactstrap-validation';

import { getSession } from 'app/shared/reducers/authentication';
import { Link } from 'react-router-dom';

export interface IPaymentProps extends StateProps, DispatchProps { }

export class PaymentPage extends React.Component<IPaymentProps> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    return (
      <Col>
        <Row>
          <h1>Payment page</h1>
        </Row>
        <Row>
          <Col md={9}>
            <Card>
              <AvForm>
                <AvRadioGroup name="paymethod" label="Payment method" required>
                  <AvRadio label="Credit Card" value="creditcard" />
                </AvRadioGroup>
              </AvForm>
            </Card>
            <br></br>
            <Card>
              <Row>
                <Col>
                  <h4>Payment information</h4>
                </Col>
              </Row>
              <Row>
                <Col md={7}>
                  <AvForm>
                    <AvField 
                    name="cardnumber" 
                    label="Card number" 
                    required />
                    <AvField 
                    name="cardname" 
                    label="Name on Card" 
                    required />
                    <Row>
                      <Col>
                        <AvField 
                        name="expdate" 
                        label="Expiry date" 
                        type="text" 
                        placeholder="MM/YY" 
                        validate={{ date: { format: 'MM/YY' } }} 
                        title="Use MM/YY" 
                        required />
                      </Col>
                      <Col>
                        <AvField 
                        name="seccode" 
                        label="Security code" 
                        type="text" 
                        minLength="3" 
                        maxLength="3" 
                        required />
                      </Col>
                    </Row>
                  </AvForm>
                </Col>
              </Row>
            </Card>
            <br></br>
            <Row>
              <Col md={10}>
                <Button tag={Link} to="/passengerinfo" color="primary">
                  Back
                </Button>
              </Col>
              <Col>
                <Button tag={Link} to="/confirmation" color="primary">
                  Confirm
                </Button>
              </Col>
            </Row>
          </Col>

          <Col md={3}>
            <Card>
              <Row>
                <Col>
                  <h4>Order details</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
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

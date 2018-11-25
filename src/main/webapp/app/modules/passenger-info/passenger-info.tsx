import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container, Alert, Button, Card, CardHeader, CardBody, CardImg, CardText, CardSubtitle, ListGroup, ListGroupItem } from 'reactstrap';
import { AvForm, AvField, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';
import { getSession } from 'app/shared/reducers/authentication';
import { Link } from 'react-router-dom';

export interface IPassengerInfoProps extends StateProps, DispatchProps {}

export class PassengerInfoPage extends React.Component<IPassengerInfoProps> {
  state = {
    form: null
  };

  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const nPassengers = this.props.nPassengers;
    const forms = [];

    for (let i = 0; i < nPassengers; i++) {
      forms.push(
        <Container>
        <Row>
          <h1>Passenger Info Page</h1>
        </Row>
        <Row>
          <AvForm ref={c => (this.state.form = c)} id="passenger-info-form">
            <Row>
              <Col>
                <AvField
                  name="passengerFirstName"
                  label="Passenger First Name"
                  placeholder="Toacy"
                />
              </Col>
              <Col>
                <AvField
                    name="passengerLastName"
                    label="Passenger Last Name"
                    placeholder="Oliveira"
                />
              </Col>
            </Row>
            <Row>
              <Col xs="4">
                <AvField
                  name="nationality"
                  label="Nationality"
                  type="select"
                >
                  <option value="Brazil">Brazil</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Peru">Peru</option>
                  <option value="Venezuela">Venezuela</option>
                </AvField>
              </Col>
              <Col xs="3">
                <AvField
                  name="documentType"
                  label="Document Type"
                  type="select"
                >
                  <option value="cpf">CPF</option>
                  <option value="passport">Passport</option>
                  <option value="id">National ID</option>
                </AvField>
              </Col>
              <Col xs="5">
                <AvField
                  name="documentNumber"
                  label="Document Number"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <AvField
                name="birthDate"
                label="Birth Date"
                type="date"
                />
              </Col>
              <Col>
                <AvField
                    name="passengerGender"
                    label="Gender"
                    type="select"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </AvField>
              </Col>
              <Col>
                <AvField
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Numbers only."
                />
              </Col>
            </Row>
            <Row>
              <Col xs="9">
                <AvField
                  name="address"
                  label="Address"
                />
              </Col>
              <Col xs="3">
                <AvField
                  name="zipcode"
                  label="Zip Code"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <AvField
                  name="email"
                  label="E-mail"
                  placeholder="E-mail address"
                />
              </Col>
              <Col>
                <AvField
                  name="emailConfirmation"
                  label="E-mail Confirmation"
                  placeholder="Please confirm your e-mail."
                />
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
              <Button tag={Link} to="/summary" color="primary">
                Go back to summary page
              </Button>
              </Col>
              <Col>
              <Button tag={Link} to="/payment" color="primary">
                Submit information and go to payment
              </Button>
              </Col>
            </Row>
          </AvForm>
        </Row>
      </Container>
      );
    }
    return (
      <div>
        { forms }
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  nPassengers: storeState.home.nPassengers
});

const mapDispatchToProps = {
  getSession
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassengerInfoPage);

import './home.scss';

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert, Button, Card, CardBody, CardImg, CardText, CardTitle, CardSubtitle } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { handleSubmit, handleRedirect } from './home.reducer';
import { getSession } from 'app/shared/reducers/authentication';

const returnAfterDepart = (value, ctx) => {
  if (ctx.returnDate > ctx.departDate) {
    return true;
  }
  return 'Return date must be after departure date';
};
const originDestinationValidation = (value, ctx) => {
  if (ctx.origin !== ctx.destination) {
    return true;
  }
  return 'Origin and destination cannot be the same!';
};

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  state = {
    form: null
  };
  constructor(props) {
    super(props);

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.validateDeparture = this.validateDeparture.bind(this);
    this.validateReturn = this.validateReturn.bind(this);
    this.validateOrigin = this.validateOrigin.bind(this);
    this.validateDestination = this.validateDestination.bind(this);
  }

  componentDidMount() {
    this.props.getSession();
  }

  handleValidSubmit = (event, values) => {
    // If the submit is valid, sets the trip information, and the 'redirect' variable to true in the Redux store
    this.props.handleSubmit(values.origin, values.destination, values.departDate, values.returnDate, values.nPassengers);
    this.props.handleRedirect();
    event.preventDefault();
  };

  validateReturn = () => {
    this.state.form.validateInput('returnDate');
  };
  validateDeparture = () => {
    this.state.form.validateInput('departDate');
  };
  validateOrigin = () => {
    this.state.form.validateInput('origin');
  };
  validateDestination = () => {
    this.state.form.validateInput('destination');
  };

  handleParisClick = () => {
    this.props.handleSubmit('Rio de Janeiro', 'Paris', '2018-12-12', '2018-12-20', '2');
    this.props.handleRedirect();
  };
  handleRomeClick = () => {
    this.props.handleSubmit('Rio de Janeiro', 'Rome', '2018-12-20', '2018-12-27', '2');
    this.props.handleRedirect();
  };
  handleDubaiClick = () => {
    this.props.handleSubmit('Rio de Janeiro', 'Dubai', '2018-12-28', '2019-01-04', '2');
    this.props.handleRedirect();
  };

  render() {
    const { account, redirect } = this.props;

    if (redirect) {
      return <Redirect to="/planner" />;
    }

    return (
      <Col>
        <h2>Welcome to the Trip Planner!</h2>
        <p className="lead">Ready to plan a trip?</p>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <Card className="tripCard">
              <AvForm ref={c => (this.state.form = c)} id="trip-form" onValidSubmit={this.handleValidSubmit}>
                <Row>
                  <Col>
                    <AvField
                      name="origin"
                      label="Origin"
                      placeholder="Rio de Janeiro"
                      type="search"
                      validate={{
                        required: { value: true, errorMessage: 'Origin not provided!' },
                        minLength: { value: 3, errorMessage: 'Origin must have more than 3 characters.' },
                        maxLength: { value: 30, errorMessage: 'Origin name is too big!' },
                        myValidation: originDestinationValidation
                      }}
                      onChange={this.validateDestination}
                    />
                  </Col>
                  <Col>
                    <AvField
                      name="destination"
                      label="Destination"
                      placeholder="Paris"
                      type="search"
                      validate={{
                        required: { value: true, errorMessage: 'Destination not provided!' },
                        minLength: { value: 3, errorMessage: 'Destination must have more than 3 characters.' },
                        maxLength: { value: 30, errorMessage: 'Destination name is too big!' },
                        myValidation: originDestinationValidation
                      }}
                      onChange={this.validateOrigin}
                    />
                  </Col>
                  <Col>
                    <AvField
                      name="departDate"
                      label="Departure Date"
                      placeholder="date placeholder"
                      type="date"
                      validate={{
                        required: { value: true, errorMessage: 'A departure date is required!' },
                        dateRange: { start: { value: 0, units: 'years' }, end: { value: 1, units: 'years' } },
                        myValidation: returnAfterDepart
                      }}
                      onChange={this.validateReturn}
                    />
                  </Col>
                  <Col>
                    <AvField
                      name="returnDate"
                      label="Return Date"
                      placeholder="date placeholder"
                      type="date"
                      validate={{
                        required: { value: true, errorMessage: 'A return date is required!' },
                        dateRange: { start: { value: 0, units: 'years' }, end: { value: 1, units: 'years' } },
                        myValidation: returnAfterDepart
                      }}
                      onChange={this.validateDeparture}
                    />
                  </Col>
                  <Col>
                    <AvField
                      name="nPassengers"
                      label="Number of Passengers"
                      type="number"
                      validate={{
                        required: { value: true, errorMessage: 'Must provide number of passengers.' }
                      }}
                    />
                  </Col>
                </Row>
                <Button id="trip-submit" color="primary" type="submit">
                  Start planning!
                </Button>
              </AvForm>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="9">
            <br />
            <p>With our web app, you will be able to:</p>

            <Row>
              <Col>
                <Row>
                  <Col xs="1">
                    <Card>
                      <CardImg top src={require('../../../static/images/planeIcon.png')} alt="Card image cap" />
                    </Card>
                  </Col>
                  <Col className="functionalityCardDescription">Book flights to all the destinations in your itinerary.</Col>
                </Row>
                <Row>
                  <Col xs="1">
                    <Card>
                      <CardImg top src={require('../../../static/images/hotelIcon.png')} alt="Card image cap" />
                    </Card>
                  </Col>
                  <Col className="functionalityCardDescription">Book a hotel room for your trip.</Col>
                </Row>
                <Row>
                  <Col xs="1">
                    <Card>
                      <CardImg top src={require('../../../static/images/attractionIcon.png')} alt="Card image cap" />
                    </Card>
                  </Col>
                  <Col className="functionalityCardDescription">Look up attractions and reserve tickets.</Col>
                </Row>
                <Row>
                  <Col xs="1">
                    <Card>
                      <CardImg top src={require('../../../static/images/carIcon.jpg')} alt="Card image cap" />
                    </Card>
                  </Col>
                  <Col className="functionalityCardDescription">Rent a car.</Col>
                </Row>
                <Row>
                  <Col xs="1">
                    <Card>
                      <CardImg top src={require('../../../static/images/insuranceIcon.png')} alt="Card image cap" />
                    </Card>
                  </Col>
                  <Col className="functionalityCardDescription">Buy an insurance for your trip.</Col>
                </Row>
              </Col>
            </Row>
            <br />
            <h2>Check out our recommendations!</h2>
          </Col>
        </Row>

        <Row>
          <Col md="4">
            <Card>
              <CardImg
                className="recommendationImg"
                onClick={this.handleParisClick}
                top
                width="100%"
                height="300"
                src={require('../../../static/images/parisTrip.jpg')}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>Paris</CardTitle>
                <CardText>Take a look at some of our trips to Paris in December.</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <CardImg
                className="recommendationImg"
                onClick={this.handleRomeClick}
                top
                width="100%"
                height="300"
                src={require('../../../static/images/romeTrip.jpg')}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>Rome</CardTitle>
                <CardText>Enjoy Christmas at one of the most historical european cities.</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <CardImg
                className="recommendationImg"
                onClick={this.handleDubaiClick}
                top
                width="100%"
                height="300"
                src={require('../../../static/images/dubaiTrip.jpg')}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>Dubai</CardTitle>
                <CardText>With a new year coming, why not try something exotic????</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Col>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  redirect: storeState.home.redirect
});

const mapDispatchToProps = { getSession, handleSubmit, handleRedirect };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

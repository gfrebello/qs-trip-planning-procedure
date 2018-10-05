import './home.scss';

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert, Button } from 'reactstrap';
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

  render() {
    const { account, redirect } = this.props;

    if (redirect) {
      return <Redirect to="/planner" />;
    }

    return (
      <Row>
        <Col md="9">
          <h2>Welcome to the Trip Planner!</h2>
          <p className="lead">Ready to plan a trip?</p>
          {account && account.login ? (
            <div>
              <Alert color="success">You are logged in as user {account.login}.</Alert>
            </div>
          ) : (
            <div>
              <Alert color="warning">
                <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
                <Link to="/login" className="alert-link">
                  <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
                </Link>
                <Translate contentKey="global.messages.info.authenticated.suffix">
                  , you can try the default accounts:
                  <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                  <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
                </Translate>
              </Alert>

              <Alert color="warning">
                <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>
                &nbsp;
                <Link to="/register" className="alert-link">
                  <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
                </Link>
              </Alert>
            </div>
          )}
          <p>With our web app, you will be capable of:</p>

          <ul>
            <li>Booking flights to all the destinations in your itinerary.</li>
            <li>Booking a hotel room (or other accommodation) throughout your trip.</li>
            <li>Looking up attractions and, when possible, reserving tickets.</li>
            <li>Renting a car.</li>
            <li>Buying an insurance that will give you the security you need for a smooth trip.</li>
          </ul>

          <p>We hope you enjoy our services. To start a new trip, fill in the information below and click the "Start planning" button!</p>

          <AvForm ref={c => (this.state.form = c)} id="trip-form" onValidSubmit={this.handleValidSubmit}>
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
            <AvField
              name="nPassengers"
              label="Number of Passengers"
              type="number"
              validate={{
                required: { value: true, errorMessage: 'Must provide number of passengers.' }
              }}
            />
            <Button id="trip-submit" color="primary" type="submit">
              Start planning!
            </Button>
          </AvForm>
        </Col>
        <Col md="3" className="pad">
          <span className="hipster rounded" />
        </Col>
      </Row>
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

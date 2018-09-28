import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import { getSession } from 'app/shared/reducers/authentication';
import { resetRedirect } from '../home/home.reducer';

export interface IPlannerProp extends StateProps, DispatchProps {}

export class PlannerPage extends React.Component<IPlannerProp> {
  componentDidMount() {
    this.props.getSession();
    this.props.resetRedirect();
  }

  render() {
    const { origin, destination, departDate, returnDate, nPassengers } = this.props;
    return (
      <div>
        <h1>Planning page</h1>
        <div>
          <p> Welcome to the planning page! </p>

          <p>
            {' '}
            On this page, you can browse and select available flights, hotel rooms, attractions, car rentals and insurance for your chosen
            trip. You can also filter your options according to your personal preferences.{' '}
          </p>

          <p> When you're all set, click the "Finish Planning" button on the bottom of this page. </p>
        </div>
        <div>
          <h4>Information about your current trip:</h4>
          <ul>
            <li>Origin: {origin}</li>
            <li>Destination: {destination}</li>
            <li>Departure Date: {departDate}</li>
            <li>Return Date: {returnDate}</li>
            <li>Number of Passengers: {nPassengers}</li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  origin: storeState.home.origin,
  destination: storeState.home.destination,
  departDate: storeState.home.departDate,
  returnDate: storeState.home.returnDate,
  nPassengers: storeState.home.nPassengers
});

const mapDispatchToProps = { getSession, resetRedirect };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlannerPage);

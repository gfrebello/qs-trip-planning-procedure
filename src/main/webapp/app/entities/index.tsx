import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Trip from './trip';
import Ticket from './ticket';
import Payment from './payment';
import Paycheck from './paycheck';
import CreditCard from './credit-card';
import FlightReservation from './flight-reservation';
import Flight from './flight';
import HotelReservation from './hotel-reservation';
import Hotel from './hotel';
import HotelRoom from './hotel-room';
import ChoosenAttraction from './choosen-attraction';
import Attraction from './attraction';
import Insurance from './insurance';
import CarRental from './car-rental';
import Region from './region';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/trip`} component={Trip} />
      <ErrorBoundaryRoute path={`${match.url}/ticket`} component={Ticket} />
      <ErrorBoundaryRoute path={`${match.url}/payment`} component={Payment} />
      <ErrorBoundaryRoute path={`${match.url}/paycheck`} component={Paycheck} />
      <ErrorBoundaryRoute path={`${match.url}/credit-card`} component={CreditCard} />
      <ErrorBoundaryRoute path={`${match.url}/flight-reservation`} component={FlightReservation} />
      <ErrorBoundaryRoute path={`${match.url}/flight`} component={Flight} />
      <ErrorBoundaryRoute path={`${match.url}/hotel-reservation`} component={HotelReservation} />
      <ErrorBoundaryRoute path={`${match.url}/hotel`} component={Hotel} />
      <ErrorBoundaryRoute path={`${match.url}/hotel-room`} component={HotelRoom} />
      <ErrorBoundaryRoute path={`${match.url}/choosen-attraction`} component={ChoosenAttraction} />
      <ErrorBoundaryRoute path={`${match.url}/attraction`} component={Attraction} />
      <ErrorBoundaryRoute path={`${match.url}/insurance`} component={Insurance} />
      <ErrorBoundaryRoute path={`${match.url}/car-rental`} component={CarRental} />
      <ErrorBoundaryRoute path={`${match.url}/region`} component={Region} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;

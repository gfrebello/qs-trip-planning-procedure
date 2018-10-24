import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FlightReservation from './flight-reservation';
import FlightReservationDetail from './flight-reservation-detail';
import FlightReservationUpdate from './flight-reservation-update';
import FlightReservationDeleteDialog from './flight-reservation-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FlightReservationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FlightReservationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FlightReservationDetail} />
      <ErrorBoundaryRoute path={match.url} component={FlightReservation} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FlightReservationDeleteDialog} />
  </>
);

export default Routes;

import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import HotelReservation from './hotel-reservation';
import HotelReservationDetail from './hotel-reservation-detail';
import HotelReservationUpdate from './hotel-reservation-update';
import HotelReservationDeleteDialog from './hotel-reservation-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HotelReservationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HotelReservationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HotelReservationDetail} />
      <ErrorBoundaryRoute path={match.url} component={HotelReservation} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={HotelReservationDeleteDialog} />
  </>
);

export default Routes;

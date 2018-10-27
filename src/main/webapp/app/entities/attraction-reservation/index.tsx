import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AttractionReservation from './attraction-reservation';
import AttractionReservationDetail from './attraction-reservation-detail';
import AttractionReservationUpdate from './attraction-reservation-update';
import AttractionReservationDeleteDialog from './attraction-reservation-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AttractionReservationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AttractionReservationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AttractionReservationDetail} />
      <ErrorBoundaryRoute path={match.url} component={AttractionReservation} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AttractionReservationDeleteDialog} />
  </>
);

export default Routes;

import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Seat from './seat';
import SeatDetail from './seat-detail';
import SeatUpdate from './seat-update';
import SeatDeleteDialog from './seat-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SeatUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SeatUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SeatDetail} />
      <ErrorBoundaryRoute path={match.url} component={Seat} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SeatDeleteDialog} />
  </>
);

export default Routes;

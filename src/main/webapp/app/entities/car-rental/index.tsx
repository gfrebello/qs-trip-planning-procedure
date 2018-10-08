import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CarRental from './car-rental';
import CarRentalDetail from './car-rental-detail';
import CarRentalUpdate from './car-rental-update';
import CarRentalDeleteDialog from './car-rental-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CarRentalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CarRentalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CarRentalDetail} />
      <ErrorBoundaryRoute path={match.url} component={CarRental} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CarRentalDeleteDialog} />
  </>
);

export default Routes;

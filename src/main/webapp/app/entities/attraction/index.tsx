import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Attraction from './attraction';
import AttractionDetail from './attraction-detail';
import AttractionUpdate from './attraction-update';
import AttractionDeleteDialog from './attraction-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AttractionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AttractionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AttractionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Attraction} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AttractionDeleteDialog} />
  </>
);

export default Routes;

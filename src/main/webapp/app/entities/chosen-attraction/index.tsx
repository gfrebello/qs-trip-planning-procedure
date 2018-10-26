import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ChosenAttraction from './chosen-attraction';
import ChosenAttractionDetail from './chosen-attraction-detail';
import ChosenAttractionUpdate from './chosen-attraction-update';
import ChosenAttractionDeleteDialog from './chosen-attraction-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChosenAttractionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChosenAttractionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChosenAttractionDetail} />
      <ErrorBoundaryRoute path={match.url} component={ChosenAttraction} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ChosenAttractionDeleteDialog} />
  </>
);

export default Routes;

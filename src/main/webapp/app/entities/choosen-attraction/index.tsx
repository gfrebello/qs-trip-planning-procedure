import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ChoosenAttraction from './choosen-attraction';
import ChoosenAttractionDetail from './choosen-attraction-detail';
import ChoosenAttractionUpdate from './choosen-attraction-update';
import ChoosenAttractionDeleteDialog from './choosen-attraction-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChoosenAttractionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChoosenAttractionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChoosenAttractionDetail} />
      <ErrorBoundaryRoute path={match.url} component={ChoosenAttraction} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ChoosenAttractionDeleteDialog} />
  </>
);

export default Routes;

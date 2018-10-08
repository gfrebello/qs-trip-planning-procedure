import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Paycheck from './paycheck';
import PaycheckDetail from './paycheck-detail';
import PaycheckUpdate from './paycheck-update';
import PaycheckDeleteDialog from './paycheck-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PaycheckUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PaycheckUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PaycheckDetail} />
      <ErrorBoundaryRoute path={match.url} component={Paycheck} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PaycheckDeleteDialog} />
  </>
);

export default Routes;

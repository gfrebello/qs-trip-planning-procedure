import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CreditCard from './credit-card';
import CreditCardDetail from './credit-card-detail';
import CreditCardUpdate from './credit-card-update';
import CreditCardDeleteDialog from './credit-card-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CreditCardUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CreditCardUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CreditCardDetail} />
      <ErrorBoundaryRoute path={match.url} component={CreditCard} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CreditCardDeleteDialog} />
  </>
);

export default Routes;

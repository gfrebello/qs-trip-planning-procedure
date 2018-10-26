import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CheckPayment from './check-payment';
import CheckPaymentDetail from './check-payment-detail';
import CheckPaymentUpdate from './check-payment-update';
import CheckPaymentDeleteDialog from './check-payment-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CheckPaymentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CheckPaymentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CheckPaymentDetail} />
      <ErrorBoundaryRoute path={match.url} component={CheckPayment} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CheckPaymentDeleteDialog} />
  </>
);

export default Routes;

import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import HotelRoom from './hotel-room';
import HotelRoomDetail from './hotel-room-detail';
import HotelRoomUpdate from './hotel-room-update';
import HotelRoomDeleteDialog from './hotel-room-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HotelRoomUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HotelRoomUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HotelRoomDetail} />
      <ErrorBoundaryRoute path={match.url} component={HotelRoom} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={HotelRoomDeleteDialog} />
  </>
);

export default Routes;

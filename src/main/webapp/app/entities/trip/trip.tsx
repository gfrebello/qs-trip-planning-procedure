import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './trip.reducer';
import { ITrip } from 'app/shared/model/trip.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITripProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Trip extends React.Component<ITripProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { tripList, match } = this.props;
    return (
      <div>
        <h2 id="trip-heading">
          <Translate contentKey="tripPlanningApp.trip.home.title">Trips</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="tripPlanningApp.trip.home.createLabel">Create new Trip</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.trip.numberOfPeople">Number Of People</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.trip.departureDate">Departure Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.trip.returnDate">Return Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.trip.origin">Origin</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.trip.destination">Destination</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.trip.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tripList.map((trip, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${trip.id}`} color="link" size="sm">
                      {trip.id}
                    </Button>
                  </td>
                  <td>{trip.numberOfPeople}</td>
                  <td>
                    <TextFormat type="date" value={trip.departureDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={trip.returnDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{trip.origin}</td>
                  <td>{trip.destination}</td>
                  <td>{trip.user ? trip.user.login : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${trip.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${trip.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${trip.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ trip }: IRootState) => ({
  tripList: trip.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trip);

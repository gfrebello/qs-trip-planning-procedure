import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './flight-reservation.reducer';
import { IFlightReservation } from 'app/shared/model/flight-reservation.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFlightReservationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class FlightReservation extends React.Component<IFlightReservationProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { flightReservationList, match } = this.props;
    return (
      <div>
        <h2 id="flight-reservation-heading">
          <Translate contentKey="tripPlanningApp.flightReservation.home.title">Flight Reservations</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="tripPlanningApp.flightReservation.home.createLabel">Create new Flight Reservation</Translate>
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
                  <Translate contentKey="tripPlanningApp.flightReservation.numberOfExecutive">Number Of Executive</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.flightReservation.numberOfEconomic">Number Of Economic</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.flightReservation.totalPrice">Total Price</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.flightReservation.flight">Flight</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.flightReservation.trip">Trip</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {flightReservationList.map((flightReservation, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${flightReservation.id}`} color="link" size="sm">
                      {flightReservation.id}
                    </Button>
                  </td>
                  <td>{flightReservation.numberOfExecutive}</td>
                  <td>{flightReservation.numberOfEconomic}</td>
                  <td>{flightReservation.totalPrice}</td>
                  <td>
                    {flightReservation.flight ? (
                      <Link to={`flight/${flightReservation.flight.id}`}>{flightReservation.flight.flightCode}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{flightReservation.trip ? <Link to={`trip/${flightReservation.trip.id}`}>{flightReservation.trip.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${flightReservation.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${flightReservation.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${flightReservation.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ flightReservation }: IRootState) => ({
  flightReservationList: flightReservation.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightReservation);

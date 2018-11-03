import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './seat.reducer';
import { ISeat } from 'app/shared/model/seat.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISeatProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Seat extends React.Component<ISeatProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { seatList, match } = this.props;
    return (
      <div>
        <h2 id="seat-heading">
          <Translate contentKey="tripPlanningApp.seat.home.title">Seats</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="tripPlanningApp.seat.home.createLabel">Create new Seat</Translate>
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
                  <Translate contentKey="tripPlanningApp.seat.number">Number</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.seat.row">Row</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.seat.customerClass">Customer Class</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.seat.isReserved">Is Reserved</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.seat.flight">Flight</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.seat.flightReservation">Flight Reservation</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {seatList.map((seat, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${seat.id}`} color="link" size="sm">
                      {seat.id}
                    </Button>
                  </td>
                  <td>{seat.number}</td>
                  <td>{seat.row}</td>
                  <td>{seat.customerClass}</td>
                  <td>{seat.isReserved ? 'true' : 'false'}</td>
                  <td>{seat.flight ? <Link to={`flight/${seat.flight.id}`}>{seat.flight.id}</Link> : ''}</td>
                  <td>
                    {seat.flightReservation ? (
                      <Link to={`flight-reservation/${seat.flightReservation.id}`}>{seat.flightReservation.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${seat.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${seat.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${seat.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ seat }: IRootState) => ({
  seatList: seat.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Seat);

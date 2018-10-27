import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './attraction-reservation.reducer';
import { IAttractionReservation } from 'app/shared/model/attraction-reservation.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAttractionReservationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class AttractionReservation extends React.Component<IAttractionReservationProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { attractionReservationList, match } = this.props;
    return (
      <div>
        <h2 id="attraction-reservation-heading">
          <Translate contentKey="tripPlanningApp.attractionReservation.home.title">Attraction Reservations</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="tripPlanningApp.attractionReservation.home.createLabel">Create new Attraction Reservation</Translate>
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
                  <Translate contentKey="tripPlanningApp.attractionReservation.isReserved">Is Reserved</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.attractionReservation.reservationDate">Reservation Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.attractionReservation.attraction">Attraction</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.attractionReservation.trip">Trip</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {attractionReservationList.map((attractionReservation, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${attractionReservation.id}`} color="link" size="sm">
                      {attractionReservation.id}
                    </Button>
                  </td>
                  <td>{attractionReservation.isReserved ? 'true' : 'false'}</td>
                  <td>
                    <TextFormat type="date" value={attractionReservation.reservationDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    {attractionReservation.attraction ? (
                      <Link to={`attraction/${attractionReservation.attraction.id}`}>{attractionReservation.attraction.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {attractionReservation.trip ? (
                      <Link to={`trip/${attractionReservation.trip.id}`}>{attractionReservation.trip.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${attractionReservation.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${attractionReservation.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${attractionReservation.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ attractionReservation }: IRootState) => ({
  attractionReservationList: attractionReservation.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttractionReservation);

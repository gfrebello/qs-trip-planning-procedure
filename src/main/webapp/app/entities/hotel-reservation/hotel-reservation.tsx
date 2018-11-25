import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './hotel-reservation.reducer';
import { IHotelReservation } from 'app/shared/model/hotel-reservation.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHotelReservationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class HotelReservation extends React.Component<IHotelReservationProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { hotelReservationList, match } = this.props;
    return (
      <div>
        <h2 id="hotel-reservation-heading">
          <Translate contentKey="tripPlanningApp.hotelReservation.home.title">Hotel Reservations</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="tripPlanningApp.hotelReservation.home.createLabel">Create new Hotel Reservation</Translate>
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
                  <Translate contentKey="tripPlanningApp.hotelReservation.numberOfPeople">Number Of People</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.hotelReservation.checkinDate">Checkin Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.hotelReservation.checkoutDate">Checkout Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.hotelReservation.totalPrice">Total Price</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.hotelReservation.hotelRoom">Hotel Room</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.hotelReservation.trip">Trip</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {hotelReservationList.map((hotelReservation, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${hotelReservation.id}`} color="link" size="sm">
                      {hotelReservation.id}
                    </Button>
                  </td>
                  <td>{hotelReservation.numberOfPeople}</td>
                  <td>
                    <TextFormat type="date" value={hotelReservation.checkinDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={hotelReservation.checkoutDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{hotelReservation.totalPrice}</td>
                  <td>
                    {hotelReservation.hotelRooms
                      ? hotelReservation.hotelRooms.map((val, j) => (
                          <span key={j}>
                            <Link to={`hotel-room/${val.id}`}>{val.id}</Link>
                            {j === hotelReservation.hotelRooms.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>{hotelReservation.trip ? <Link to={`trip/${hotelReservation.trip.id}`}>{hotelReservation.trip.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${hotelReservation.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${hotelReservation.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${hotelReservation.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ hotelReservation }: IRootState) => ({
  hotelReservationList: hotelReservation.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelReservation);

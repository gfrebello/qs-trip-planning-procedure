import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './hotel-reservation.reducer';
import { IHotelReservation } from 'app/shared/model/hotel-reservation.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHotelReservationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class HotelReservationDetail extends React.Component<IHotelReservationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { hotelReservationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tripPlanningApp.hotelReservation.detail.title">HotelReservation</Translate> [
            <b>{hotelReservationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="numberOfPeople">
                <Translate contentKey="tripPlanningApp.hotelReservation.numberOfPeople">Number Of People</Translate>
              </span>
            </dt>
            <dd>{hotelReservationEntity.numberOfPeople}</dd>
            <dt>
              <span id="checkinDate">
                <Translate contentKey="tripPlanningApp.hotelReservation.checkinDate">Checkin Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={hotelReservationEntity.checkinDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="checkoutDate">
                <Translate contentKey="tripPlanningApp.hotelReservation.checkoutDate">Checkout Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={hotelReservationEntity.checkoutDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="totalPrice">
                <Translate contentKey="tripPlanningApp.hotelReservation.totalPrice">Total Price</Translate>
              </span>
            </dt>
            <dd>{hotelReservationEntity.totalPrice}</dd>
            <dt>
              <Translate contentKey="tripPlanningApp.hotelReservation.hotelRoom">Hotel Room</Translate>
            </dt>
            <dd>
              {hotelReservationEntity.hotelRooms
                ? hotelReservationEntity.hotelRooms.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === hotelReservationEntity.hotelRooms.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="tripPlanningApp.hotelReservation.trip">Trip</Translate>
            </dt>
            <dd>{hotelReservationEntity.trip ? hotelReservationEntity.trip.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/hotel-reservation" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/hotel-reservation/${hotelReservationEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ hotelReservation }: IRootState) => ({
  hotelReservationEntity: hotelReservation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelReservationDetail);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IHotelRoom } from 'app/shared/model/hotel-room.model';
import { getEntities as getHotelRooms } from 'app/entities/hotel-room/hotel-room.reducer';
import { ITrip } from 'app/shared/model/trip.model';
import { getEntities as getTrips } from 'app/entities/trip/trip.reducer';
import { getEntity, updateEntity, createEntity, reset } from './hotel-reservation.reducer';
import { IHotelReservation } from 'app/shared/model/hotel-reservation.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHotelReservationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IHotelReservationUpdateState {
  isNew: boolean;
  idshotelRoom: any[];
  tripId: number;
}

export class HotelReservationUpdate extends React.Component<IHotelReservationUpdateProps, IHotelReservationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idshotelRoom: [],
      tripId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getHotelRooms();
    this.props.getTrips();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { hotelReservationEntity } = this.props;
      const entity = {
        ...hotelReservationEntity,
        ...values,
        hotelRooms: mapIdList(values.hotelRooms)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/hotel-reservation');
  };

  render() {
    const { hotelReservationEntity, hotelRooms, trips, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tripPlanningApp.hotelReservation.home.createOrEditLabel">
              <Translate contentKey="tripPlanningApp.hotelReservation.home.createOrEditLabel">Create or edit a HotelReservation</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : hotelReservationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="hotel-reservation-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="numberOfPeopleLabel" for="numberOfPeople">
                    <Translate contentKey="tripPlanningApp.hotelReservation.numberOfPeople">Number Of People</Translate>
                  </Label>
                  <AvField id="hotel-reservation-numberOfPeople" type="number" className="form-control" name="numberOfPeople" />
                </AvGroup>
                <AvGroup>
                  <Label id="checkinDateLabel" for="checkinDate">
                    <Translate contentKey="tripPlanningApp.hotelReservation.checkinDate">Checkin Date</Translate>
                  </Label>
                  <AvField id="hotel-reservation-checkinDate" type="date" className="form-control" name="checkinDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="checkoutDateLabel" for="checkoutDate">
                    <Translate contentKey="tripPlanningApp.hotelReservation.checkoutDate">Checkout Date</Translate>
                  </Label>
                  <AvField id="hotel-reservation-checkoutDate" type="date" className="form-control" name="checkoutDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="totalPriceLabel" for="totalPrice">
                    <Translate contentKey="tripPlanningApp.hotelReservation.totalPrice">Total Price</Translate>
                  </Label>
                  <AvField id="hotel-reservation-totalPrice" type="number" className="form-control" name="totalPrice" />
                </AvGroup>
                <AvGroup>
                  <Label for="hotelRooms">
                    <Translate contentKey="tripPlanningApp.hotelReservation.hotelRoom">Hotel Room</Translate>
                  </Label>
                  <AvInput
                    id="hotel-reservation-hotelRoom"
                    type="select"
                    multiple
                    className="form-control"
                    name="hotelRooms"
                    value={hotelReservationEntity.hotelRooms && hotelReservationEntity.hotelRooms.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {hotelRooms
                      ? hotelRooms.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="trip.id">
                    <Translate contentKey="tripPlanningApp.hotelReservation.trip">Trip</Translate>
                  </Label>
                  <AvInput id="hotel-reservation-trip" type="select" className="form-control" name="trip.id">
                    <option value="" key="0" />
                    {trips
                      ? trips.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/hotel-reservation" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  hotelRooms: storeState.hotelRoom.entities,
  trips: storeState.trip.entities,
  hotelReservationEntity: storeState.hotelReservation.entity,
  loading: storeState.hotelReservation.loading,
  updating: storeState.hotelReservation.updating
});

const mapDispatchToProps = {
  getHotelRooms,
  getTrips,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelReservationUpdate);

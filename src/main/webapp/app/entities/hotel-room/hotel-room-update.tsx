import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IHotel } from 'app/shared/model/hotel.model';
import { getEntities as getHotels } from 'app/entities/hotel/hotel.reducer';
import { IHotelReservation } from 'app/shared/model/hotel-reservation.model';
import { getEntities as getHotelReservations } from 'app/entities/hotel-reservation/hotel-reservation.reducer';
import { getEntity, updateEntity, createEntity, reset } from './hotel-room.reducer';
import { IHotelRoom } from 'app/shared/model/hotel-room.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHotelRoomUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IHotelRoomUpdateState {
  isNew: boolean;
  hotelId: number;
  hotelReservationId: number;
}

export class HotelRoomUpdate extends React.Component<IHotelRoomUpdateProps, IHotelRoomUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      hotelId: 0,
      hotelReservationId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getHotels();
    this.props.getHotelReservations();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { hotelRoomEntity } = this.props;
      const entity = {
        ...hotelRoomEntity,
        ...values
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
    this.props.history.push('/entity/hotel-room');
  };

  render() {
    const { hotelRoomEntity, hotels, hotelReservations, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tripPlanningApp.hotelRoom.home.createOrEditLabel">
              <Translate contentKey="tripPlanningApp.hotelRoom.home.createOrEditLabel">Create or edit a HotelRoom</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : hotelRoomEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="hotel-room-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="maxCapacityLabel" for="maxCapacity">
                    <Translate contentKey="tripPlanningApp.hotelRoom.maxCapacity">Max Capacity</Translate>
                  </Label>
                  <AvField id="hotel-room-maxCapacity" type="number" className="form-control" name="maxCapacity" />
                </AvGroup>
                <AvGroup>
                  <Label id="isReservedLabel" check>
                    <AvInput id="hotel-room-isReserved" type="checkbox" className="form-control" name="isReserved" />
                    <Translate contentKey="tripPlanningApp.hotelRoom.isReserved">Is Reserved</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="roomTypeLabel" for="roomType">
                    <Translate contentKey="tripPlanningApp.hotelRoom.roomType">Room Type</Translate>
                  </Label>
                  <AvField id="hotel-room-roomType" type="text" name="roomType" />
                </AvGroup>
                <AvGroup>
                  <Label id="priceLabel" for="price">
                    <Translate contentKey="tripPlanningApp.hotelRoom.price">Price</Translate>
                  </Label>
                  <AvField id="hotel-room-price" type="number" className="form-control" name="price" />
                </AvGroup>
                <AvGroup>
                  <Label for="hotel.name">
                    <Translate contentKey="tripPlanningApp.hotelRoom.hotel">Hotel</Translate>
                  </Label>
                  <AvInput
                    id="hotel-room-hotel"
                    type="select"
                    className="form-control"
                    name="hotel.id"
                    value={isNew ? hotels[0] && hotels[0].id : hotelRoomEntity.hotel.id}
                  >
                    {hotels
                      ? hotels.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/hotel-room" replace color="info">
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
  hotels: storeState.hotel.entities,
  hotelReservations: storeState.hotelReservation.entities,
  hotelRoomEntity: storeState.hotelRoom.entity,
  loading: storeState.hotelRoom.loading,
  updating: storeState.hotelRoom.updating
});

const mapDispatchToProps = {
  getHotels,
  getHotelReservations,
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
)(HotelRoomUpdate);

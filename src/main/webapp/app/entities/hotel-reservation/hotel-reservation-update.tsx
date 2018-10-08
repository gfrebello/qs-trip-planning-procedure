import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './hotel-reservation.reducer';
import { IHotelReservation } from 'app/shared/model/hotel-reservation.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHotelReservationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IHotelReservationUpdateState {
  isNew: boolean;
}

export class HotelReservationUpdate extends React.Component<IHotelReservationUpdateProps, IHotelReservationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    values.checkinDate = new Date(values.checkinDate);
    values.checkoutDate = new Date(values.checkoutDate);

    if (errors.length === 0) {
      const { hotelReservationEntity } = this.props;
      const entity = {
        ...hotelReservationEntity,
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
    this.props.history.push('/entity/hotel-reservation');
  };

  render() {
    const { hotelReservationEntity, loading, updating } = this.props;
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
                  <Label id="reservationIdLabel" for="reservationId">
                    <Translate contentKey="tripPlanningApp.hotelReservation.reservationId">Reservation Id</Translate>
                  </Label>
                  <AvField id="hotel-reservation-reservationId" type="text" name="reservationId" />
                </AvGroup>
                <AvGroup>
                  <Label id="numberOfPeopleLabel" for="numberOfPeople">
                    <Translate contentKey="tripPlanningApp.hotelReservation.numberOfPeople">Number Of People</Translate>
                  </Label>
                  <AvField id="hotel-reservation-numberOfPeople" type="number" className="form-control" name="numberOfPeople" />
                </AvGroup>
                <AvGroup>
                  <Label id="onlinePaymentChoosenLabel" check>
                    <AvInput
                      id="hotel-reservation-onlinePaymentChoosen"
                      type="checkbox"
                      className="form-control"
                      name="onlinePaymentChoosen"
                    />
                    <Translate contentKey="tripPlanningApp.hotelReservation.onlinePaymentChoosen">Online Payment Choosen</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="checkinDateLabel" for="checkinDate">
                    <Translate contentKey="tripPlanningApp.hotelReservation.checkinDate">Checkin Date</Translate>
                  </Label>
                  <AvInput
                    id="hotel-reservation-checkinDate"
                    type="datetime-local"
                    className="form-control"
                    name="checkinDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.hotelReservationEntity.checkinDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="checkoutDateLabel" for="checkoutDate">
                    <Translate contentKey="tripPlanningApp.hotelReservation.checkoutDate">Checkout Date</Translate>
                  </Label>
                  <AvInput
                    id="hotel-reservation-checkoutDate"
                    type="datetime-local"
                    className="form-control"
                    name="checkoutDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.hotelReservationEntity.checkoutDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="priceLabel" for="price">
                    <Translate contentKey="tripPlanningApp.hotelReservation.price">Price</Translate>
                  </Label>
                  <AvField id="hotel-reservation-price" type="number" className="form-control" name="price" />
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
  hotelReservationEntity: storeState.hotelReservation.entity,
  loading: storeState.hotelReservation.loading,
  updating: storeState.hotelReservation.updating
});

const mapDispatchToProps = {
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

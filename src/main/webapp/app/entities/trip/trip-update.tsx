import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IHotelReservation } from 'app/shared/model/hotel-reservation.model';
import { getEntities as getHotelReservations } from 'app/entities/hotel-reservation/hotel-reservation.reducer';
import { IInsurance } from 'app/shared/model/insurance.model';
import { getEntities as getInsurances } from 'app/entities/insurance/insurance.reducer';
import { ICarRental } from 'app/shared/model/car-rental.model';
import { getEntities as getCarRentals } from 'app/entities/car-rental/car-rental.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './trip.reducer';
import { ITrip } from 'app/shared/model/trip.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITripUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ITripUpdateState {
  isNew: boolean;
  hotelReservationId: number;
  insuranceId: number;
  carRentalId: number;
  userId: number;
}

export class TripUpdate extends React.Component<ITripUpdateProps, ITripUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      hotelReservationId: 0,
      insuranceId: 0,
      carRentalId: 0,
      userId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getHotelReservations();
    this.props.getInsurances();
    this.props.getCarRentals();
    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    values.departureDate = new Date(values.departureDate);
    values.returnDate = new Date(values.returnDate);

    if (errors.length === 0) {
      const { tripEntity } = this.props;
      const entity = {
        ...tripEntity,
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
    this.props.history.push('/entity/trip');
  };

  render() {
    const { tripEntity, hotelReservations, insurances, carRentals, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tripPlanningApp.trip.home.createOrEditLabel">
              <Translate contentKey="tripPlanningApp.trip.home.createOrEditLabel">Create or edit a Trip</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : tripEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="trip-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tripIdLabel" for="tripId">
                    <Translate contentKey="tripPlanningApp.trip.tripId">Trip Id</Translate>
                  </Label>
                  <AvField id="trip-tripId" type="text" name="tripId" />
                </AvGroup>
                <AvGroup>
                  <Label id="paymentDoneLabel" check>
                    <AvInput id="trip-paymentDone" type="checkbox" className="form-control" name="paymentDone" />
                    <Translate contentKey="tripPlanningApp.trip.paymentDone">Payment Done</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="numberOfPeopleLabel" for="numberOfPeople">
                    <Translate contentKey="tripPlanningApp.trip.numberOfPeople">Number Of People</Translate>
                  </Label>
                  <AvField id="trip-numberOfPeople" type="number" className="form-control" name="numberOfPeople" />
                </AvGroup>
                <AvGroup>
                  <Label id="departureDateLabel" for="departureDate">
                    <Translate contentKey="tripPlanningApp.trip.departureDate">Departure Date</Translate>
                  </Label>
                  <AvInput
                    id="trip-departureDate"
                    type="datetime-local"
                    className="form-control"
                    name="departureDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.tripEntity.departureDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="returnDateLabel" for="returnDate">
                    <Translate contentKey="tripPlanningApp.trip.returnDate">Return Date</Translate>
                  </Label>
                  <AvInput
                    id="trip-returnDate"
                    type="datetime-local"
                    className="form-control"
                    name="returnDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.tripEntity.returnDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="originLabel" for="origin">
                    <Translate contentKey="tripPlanningApp.trip.origin">Origin</Translate>
                  </Label>
                  <AvField id="trip-origin" type="text" name="origin" />
                </AvGroup>
                <AvGroup>
                  <Label id="destinationLabel" for="destination">
                    <Translate contentKey="tripPlanningApp.trip.destination">Destination</Translate>
                  </Label>
                  <AvField id="trip-destination" type="text" name="destination" />
                </AvGroup>
                <AvGroup>
                  <Label for="hotelReservation.id">
                    <Translate contentKey="tripPlanningApp.trip.hotelReservation">Hotel Reservation</Translate>
                  </Label>
                  <AvInput id="trip-hotelReservation" type="select" className="form-control" name="hotelReservation.id">
                    <option value="" key="0" />
                    {hotelReservations
                      ? hotelReservations.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="insurance.id">
                    <Translate contentKey="tripPlanningApp.trip.insurance">Insurance</Translate>
                  </Label>
                  <AvInput id="trip-insurance" type="select" className="form-control" name="insurance.id">
                    <option value="" key="0" />
                    {insurances
                      ? insurances.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="carRental.id">
                    <Translate contentKey="tripPlanningApp.trip.carRental">Car Rental</Translate>
                  </Label>
                  <AvInput id="trip-carRental" type="select" className="form-control" name="carRental.id">
                    <option value="" key="0" />
                    {carRentals
                      ? carRentals.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="user.login">
                    <Translate contentKey="tripPlanningApp.trip.user">User</Translate>
                  </Label>
                  <AvInput
                    id="trip-user"
                    type="select"
                    className="form-control"
                    name="user.id"
                    value={isNew ? users[0] && users[0].id : tripEntity.user.id}
                  >
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/trip" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
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
  hotelReservations: storeState.hotelReservation.entities,
  insurances: storeState.insurance.entities,
  carRentals: storeState.carRental.entities,
  users: storeState.userManagement.users,
  tripEntity: storeState.trip.entity,
  loading: storeState.trip.loading,
  updating: storeState.trip.updating
});

const mapDispatchToProps = {
  getHotelReservations,
  getInsurances,
  getCarRentals,
  getUsers,
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
)(TripUpdate);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITrip } from 'app/shared/model/trip.model';
import { getEntities as getTrips } from 'app/entities/trip/trip.reducer';
import { getEntity, updateEntity, createEntity, reset } from './car-rental.reducer';
import { ICarRental } from 'app/shared/model/car-rental.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICarRentalUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICarRentalUpdateState {
  isNew: boolean;
  tripId: number;
}

export class CarRentalUpdate extends React.Component<ICarRentalUpdateProps, ICarRentalUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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

    this.props.getTrips();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { carRentalEntity } = this.props;
      const entity = {
        ...carRentalEntity,
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
    this.props.history.push('/entity/car-rental');
  };

  render() {
    const { carRentalEntity, trips, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tripPlanningApp.carRental.home.createOrEditLabel">
              <Translate contentKey="tripPlanningApp.carRental.home.createOrEditLabel">Create or edit a CarRental</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : carRentalEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="car-rental-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="carTypeLabel" for="carType">
                    <Translate contentKey="tripPlanningApp.carRental.carType">Car Type</Translate>
                  </Label>
                  <AvField id="car-rental-carType" type="text" name="carType" />
                </AvGroup>
                <AvGroup>
                  <Label id="rentalDaysLabel" for="rentalDays">
                    <Translate contentKey="tripPlanningApp.carRental.rentalDays">Rental Days</Translate>
                  </Label>
                  <AvField id="car-rental-rentalDays" type="number" className="form-control" name="rentalDays" />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="startDate">
                    <Translate contentKey="tripPlanningApp.carRental.startDate">Start Date</Translate>
                  </Label>
                  <AvField id="car-rental-startDate" type="date" className="form-control" name="startDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="priceLabel" for="price">
                    <Translate contentKey="tripPlanningApp.carRental.price">Price</Translate>
                  </Label>
                  <AvField id="car-rental-price" type="number" className="form-control" name="price" />
                </AvGroup>
                <AvGroup>
                  <Label id="pickupAddressLabel" for="pickupAddress">
                    <Translate contentKey="tripPlanningApp.carRental.pickupAddress">Pickup Address</Translate>
                  </Label>
                  <AvField id="car-rental-pickupAddress" type="text" name="pickupAddress" />
                </AvGroup>
                <AvGroup>
                  <Label id="dropoffAddressLabel" for="dropoffAddress">
                    <Translate contentKey="tripPlanningApp.carRental.dropoffAddress">Dropoff Address</Translate>
                  </Label>
                  <AvField id="car-rental-dropoffAddress" type="text" name="dropoffAddress" />
                </AvGroup>
                <AvGroup>
                  <Label id="colorLabel" for="color">
                    <Translate contentKey="tripPlanningApp.carRental.color">Color</Translate>
                  </Label>
                  <AvField id="car-rental-color" type="text" name="color" />
                </AvGroup>
                <AvGroup>
                  <Label for="trip.id">
                    <Translate contentKey="tripPlanningApp.carRental.trip">Trip</Translate>
                  </Label>
                  <AvInput id="car-rental-trip" type="select" className="form-control" name="trip.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/car-rental" replace color="info">
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
  trips: storeState.trip.entities,
  carRentalEntity: storeState.carRental.entity,
  loading: storeState.carRental.loading,
  updating: storeState.carRental.updating
});

const mapDispatchToProps = {
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
)(CarRentalUpdate);

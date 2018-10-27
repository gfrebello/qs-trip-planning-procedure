import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAttraction } from 'app/shared/model/attraction.model';
import { getEntities as getAttractions } from 'app/entities/attraction/attraction.reducer';
import { ITrip } from 'app/shared/model/trip.model';
import { getEntities as getTrips } from 'app/entities/trip/trip.reducer';
import { getEntity, updateEntity, createEntity, reset } from './attraction-reservation.reducer';
import { IAttractionReservation } from 'app/shared/model/attraction-reservation.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAttractionReservationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IAttractionReservationUpdateState {
  isNew: boolean;
  attractionId: number;
  tripId: number;
}

export class AttractionReservationUpdate extends React.Component<IAttractionReservationUpdateProps, IAttractionReservationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      attractionId: 0,
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

    this.props.getAttractions();
    this.props.getTrips();
  }

  saveEntity = (event, errors, values) => {
    values.reservationDate = new Date(values.reservationDate);

    if (errors.length === 0) {
      const { attractionReservationEntity } = this.props;
      const entity = {
        ...attractionReservationEntity,
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
    this.props.history.push('/entity/attraction-reservation');
  };

  render() {
    const { attractionReservationEntity, attractions, trips, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tripPlanningApp.attractionReservation.home.createOrEditLabel">
              <Translate contentKey="tripPlanningApp.attractionReservation.home.createOrEditLabel">
                Create or edit a AttractionReservation
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : attractionReservationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="attraction-reservation-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="isReservedLabel" check>
                    <AvInput id="attraction-reservation-isReserved" type="checkbox" className="form-control" name="isReserved" />
                    <Translate contentKey="tripPlanningApp.attractionReservation.isReserved">Is Reserved</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="reservationDateLabel" for="reservationDate">
                    <Translate contentKey="tripPlanningApp.attractionReservation.reservationDate">Reservation Date</Translate>
                  </Label>
                  <AvInput
                    id="attraction-reservation-reservationDate"
                    type="datetime-local"
                    className="form-control"
                    name="reservationDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.attractionReservationEntity.reservationDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="attraction.name">
                    <Translate contentKey="tripPlanningApp.attractionReservation.attraction">Attraction</Translate>
                  </Label>
                  <AvInput id="attraction-reservation-attraction" type="select" className="form-control" name="attraction.id">
                    <option value="" key="0" />
                    {attractions
                      ? attractions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="trip.id">
                    <Translate contentKey="tripPlanningApp.attractionReservation.trip">Trip</Translate>
                  </Label>
                  <AvInput id="attraction-reservation-trip" type="select" className="form-control" name="trip.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/attraction-reservation" replace color="info">
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
  attractions: storeState.attraction.entities,
  trips: storeState.trip.entities,
  attractionReservationEntity: storeState.attractionReservation.entity,
  loading: storeState.attractionReservation.loading,
  updating: storeState.attractionReservation.updating
});

const mapDispatchToProps = {
  getAttractions,
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
)(AttractionReservationUpdate);

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
import { getEntity, updateEntity, createEntity, reset } from './passenger.reducer';
import { IPassenger } from 'app/shared/model/passenger.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPassengerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IPassengerUpdateState {
  isNew: boolean;
  tripId: number;
}

export class PassengerUpdate extends React.Component<IPassengerUpdateProps, IPassengerUpdateState> {
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
      const { passengerEntity } = this.props;
      const entity = {
        ...passengerEntity,
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
    this.props.history.push('/entity/passenger');
  };

  render() {
    const { passengerEntity, trips, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tripPlanningApp.passenger.home.createOrEditLabel">
              <Translate contentKey="tripPlanningApp.passenger.home.createOrEditLabel">Create or edit a Passenger</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : passengerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="passenger-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="tripPlanningApp.passenger.name">Name</Translate>
                  </Label>
                  <AvField id="passenger-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    <Translate contentKey="tripPlanningApp.passenger.email">Email</Translate>
                  </Label>
                  <AvField id="passenger-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneNumberLabel" for="phoneNumber">
                    <Translate contentKey="tripPlanningApp.passenger.phoneNumber">Phone Number</Translate>
                  </Label>
                  <AvField id="passenger-phoneNumber" type="text" name="phoneNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="passportLabel" for="passport">
                    <Translate contentKey="tripPlanningApp.passenger.passport">Passport</Translate>
                  </Label>
                  <AvField id="passenger-passport" type="text" name="passport" />
                </AvGroup>
                <AvGroup>
                  <Label for="trip.id">
                    <Translate contentKey="tripPlanningApp.passenger.trip">Trip</Translate>
                  </Label>
                  <AvInput id="passenger-trip" type="select" className="form-control" name="trip.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/passenger" replace color="info">
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
  trips: storeState.trip.entities,
  passengerEntity: storeState.passenger.entity,
  loading: storeState.passenger.loading,
  updating: storeState.passenger.updating
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
)(PassengerUpdate);

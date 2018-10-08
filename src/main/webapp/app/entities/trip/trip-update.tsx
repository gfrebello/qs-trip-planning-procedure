import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './trip.reducer';
import { ITrip } from 'app/shared/model/trip.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITripUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ITripUpdateState {
  isNew: boolean;
}

export class TripUpdate extends React.Component<ITripUpdateProps, ITripUpdateState> {
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
    const { tripEntity, loading, updating } = this.props;
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
                <Button tag={Link} id="cancel-save" to="/entity/trip" replace color="info">
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
  tripEntity: storeState.trip.entity,
  loading: storeState.trip.loading,
  updating: storeState.trip.updating
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
)(TripUpdate);

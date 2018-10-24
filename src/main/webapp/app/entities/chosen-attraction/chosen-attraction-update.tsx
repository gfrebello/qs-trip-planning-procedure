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
import { getEntity, updateEntity, createEntity, reset } from './chosen-attraction.reducer';
import { IChosenAttraction } from 'app/shared/model/chosen-attraction.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChosenAttractionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IChosenAttractionUpdateState {
  isNew: boolean;
  attractionId: number;
  tripId: number;
}

export class ChosenAttractionUpdate extends React.Component<IChosenAttractionUpdateProps, IChosenAttractionUpdateState> {
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
      const { chosenAttractionEntity } = this.props;
      const entity = {
        ...chosenAttractionEntity,
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
    this.props.history.push('/entity/chosen-attraction');
  };

  render() {
    const { chosenAttractionEntity, attractions, trips, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tripPlanningApp.chosenAttraction.home.createOrEditLabel">
              <Translate contentKey="tripPlanningApp.chosenAttraction.home.createOrEditLabel">Create or edit a ChosenAttraction</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : chosenAttractionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="chosen-attraction-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="isReservedLabel" check>
                    <AvInput id="chosen-attraction-isReserved" type="checkbox" className="form-control" name="isReserved" />
                    <Translate contentKey="tripPlanningApp.chosenAttraction.isReserved">Is Reserved</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="reservationDateLabel" for="reservationDate">
                    <Translate contentKey="tripPlanningApp.chosenAttraction.reservationDate">Reservation Date</Translate>
                  </Label>
                  <AvInput
                    id="chosen-attraction-reservationDate"
                    type="datetime-local"
                    className="form-control"
                    name="reservationDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.chosenAttractionEntity.reservationDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="attraction.id">
                    <Translate contentKey="tripPlanningApp.chosenAttraction.attraction">Attraction</Translate>
                  </Label>
                  <AvInput id="chosen-attraction-attraction" type="select" className="form-control" name="attraction.id">
                    <option value="" key="0" />
                    {attractions
                      ? attractions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="trip.id">
                    <Translate contentKey="tripPlanningApp.chosenAttraction.trip">Trip</Translate>
                  </Label>
                  <AvInput id="chosen-attraction-trip" type="select" className="form-control" name="trip.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/chosen-attraction" replace color="info">
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
  chosenAttractionEntity: storeState.chosenAttraction.entity,
  loading: storeState.chosenAttraction.loading,
  updating: storeState.chosenAttraction.updating
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
)(ChosenAttractionUpdate);

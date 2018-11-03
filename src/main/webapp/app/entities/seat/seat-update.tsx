import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IFlight } from 'app/shared/model/flight.model';
import { getEntities as getFlights } from 'app/entities/flight/flight.reducer';
import { IFlightReservation } from 'app/shared/model/flight-reservation.model';
import { getEntities as getFlightReservations } from 'app/entities/flight-reservation/flight-reservation.reducer';
import { getEntity, updateEntity, createEntity, reset } from './seat.reducer';
import { ISeat } from 'app/shared/model/seat.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISeatUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ISeatUpdateState {
  isNew: boolean;
  flightId: number;
  flightReservationId: number;
}

export class SeatUpdate extends React.Component<ISeatUpdateProps, ISeatUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      flightId: 0,
      flightReservationId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getFlights();
    this.props.getFlightReservations();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { seatEntity } = this.props;
      const entity = {
        ...seatEntity,
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
    this.props.history.push('/entity/seat');
  };

  render() {
    const { seatEntity, flights, flightReservations, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tripPlanningApp.seat.home.createOrEditLabel">
              <Translate contentKey="tripPlanningApp.seat.home.createOrEditLabel">Create or edit a Seat</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : seatEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="seat-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="numberLabel" for="number">
                    <Translate contentKey="tripPlanningApp.seat.number">Number</Translate>
                  </Label>
                  <AvField id="seat-number" type="text" name="number" />
                </AvGroup>
                <AvGroup>
                  <Label id="rowLabel" for="row">
                    <Translate contentKey="tripPlanningApp.seat.row">Row</Translate>
                  </Label>
                  <AvField id="seat-row" type="text" name="row" />
                </AvGroup>
                <AvGroup>
                  <Label id="customerClassLabel" for="customerClass">
                    <Translate contentKey="tripPlanningApp.seat.customerClass">Customer Class</Translate>
                  </Label>
                  <AvField id="seat-customerClass" type="text" name="customerClass" />
                </AvGroup>
                <AvGroup>
                  <Label id="isReservedLabel" check>
                    <AvInput id="seat-isReserved" type="checkbox" className="form-control" name="isReserved" />
                    <Translate contentKey="tripPlanningApp.seat.isReserved">Is Reserved</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="flight.id">
                    <Translate contentKey="tripPlanningApp.seat.flight">Flight</Translate>
                  </Label>
                  <AvInput id="seat-flight" type="select" className="form-control" name="flight.id">
                    <option value="" key="0" />
                    {flights
                      ? flights.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="flightReservation.id">
                    <Translate contentKey="tripPlanningApp.seat.flightReservation">Flight Reservation</Translate>
                  </Label>
                  <AvInput id="seat-flightReservation" type="select" className="form-control" name="flightReservation.id">
                    <option value="" key="0" />
                    {flightReservations
                      ? flightReservations.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/seat" replace color="info">
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
  flights: storeState.flight.entities,
  flightReservations: storeState.flightReservation.entities,
  seatEntity: storeState.seat.entity,
  loading: storeState.seat.loading,
  updating: storeState.seat.updating
});

const mapDispatchToProps = {
  getFlights,
  getFlightReservations,
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
)(SeatUpdate);

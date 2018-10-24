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
import { getEntity, updateEntity, createEntity, reset } from './ticket.reducer';
import { ITicket } from 'app/shared/model/ticket.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITicketUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ITicketUpdateState {
  isNew: boolean;
  tripId: number;
}

export class TicketUpdate extends React.Component<ITicketUpdateProps, ITicketUpdateState> {
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
      const { ticketEntity } = this.props;
      const entity = {
        ...ticketEntity,
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
    this.props.history.push('/entity/ticket');
  };

  render() {
    const { ticketEntity, trips, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tripPlanningApp.ticket.home.createOrEditLabel">
              <Translate contentKey="tripPlanningApp.ticket.home.createOrEditLabel">Create or edit a Ticket</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : ticketEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="ticket-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="typeLabel" for="type">
                    <Translate contentKey="tripPlanningApp.ticket.type">Type</Translate>
                  </Label>
                  <AvField id="ticket-type" type="text" name="type" />
                </AvGroup>
                <AvGroup>
                  <Label id="reservationIdLabel" for="reservationId">
                    <Translate contentKey="tripPlanningApp.ticket.reservationId">Reservation Id</Translate>
                  </Label>
                  <AvField id="ticket-reservationId" type="text" name="reservationId" />
                </AvGroup>
                <AvGroup>
                  <Label for="trip.id">
                    <Translate contentKey="tripPlanningApp.ticket.trip">Trip</Translate>
                  </Label>
                  <AvInput id="ticket-trip" type="select" className="form-control" name="trip.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/ticket" replace color="info">
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
  ticketEntity: storeState.ticket.entity,
  loading: storeState.ticket.loading,
  updating: storeState.ticket.updating
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
)(TicketUpdate);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './flight.reducer';
import { IFlight } from 'app/shared/model/flight.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFlightUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IFlightUpdateState {
  isNew: boolean;
}

export class FlightUpdate extends React.Component<IFlightUpdateProps, IFlightUpdateState> {
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
    values.arrivalDate = new Date(values.arrivalDate);

    if (errors.length === 0) {
      const { flightEntity } = this.props;
      const entity = {
        ...flightEntity,
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
    this.props.history.push('/entity/flight');
  };

  render() {
    const { flightEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tripPlanningApp.flight.home.createOrEditLabel">
              <Translate contentKey="tripPlanningApp.flight.home.createOrEditLabel">Create or edit a Flight</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : flightEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="flight-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="companyLabel" for="company">
                    <Translate contentKey="tripPlanningApp.flight.company">Company</Translate>
                  </Label>
                  <AvField id="flight-company" type="text" name="company" />
                </AvGroup>
                <AvGroup>
                  <Label id="originLabel" for="origin">
                    <Translate contentKey="tripPlanningApp.flight.origin">Origin</Translate>
                  </Label>
                  <AvField id="flight-origin" type="text" name="origin" />
                </AvGroup>
                <AvGroup>
                  <Label id="destinationLabel" for="destination">
                    <Translate contentKey="tripPlanningApp.flight.destination">Destination</Translate>
                  </Label>
                  <AvField id="flight-destination" type="text" name="destination" />
                </AvGroup>
                <AvGroup>
                  <Label id="avaibleSeatsLabel" for="avaibleSeats">
                    <Translate contentKey="tripPlanningApp.flight.avaibleSeats">Avaible Seats</Translate>
                  </Label>
                  <AvField id="flight-avaibleSeats" type="number" className="form-control" name="avaibleSeats" />
                </AvGroup>
                <AvGroup>
                  <Label id="departureDateLabel" for="departureDate">
                    <Translate contentKey="tripPlanningApp.flight.departureDate">Departure Date</Translate>
                  </Label>
                  <AvInput
                    id="flight-departureDate"
                    type="datetime-local"
                    className="form-control"
                    name="departureDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.flightEntity.departureDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="arrivalDateLabel" for="arrivalDate">
                    <Translate contentKey="tripPlanningApp.flight.arrivalDate">Arrival Date</Translate>
                  </Label>
                  <AvInput
                    id="flight-arrivalDate"
                    type="datetime-local"
                    className="form-control"
                    name="arrivalDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.flightEntity.arrivalDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="flightCodeLabel" for="flightCode">
                    <Translate contentKey="tripPlanningApp.flight.flightCode">Flight Code</Translate>
                  </Label>
                  <AvField id="flight-flightCode" type="text" name="flightCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="departAirportLabel" for="departAirport">
                    <Translate contentKey="tripPlanningApp.flight.departAirport">Depart Airport</Translate>
                  </Label>
                  <AvField id="flight-departAirport" type="text" name="departAirport" />
                </AvGroup>
                <AvGroup>
                  <Label id="arrivalAirportLabel" for="arrivalAirport">
                    <Translate contentKey="tripPlanningApp.flight.arrivalAirport">Arrival Airport</Translate>
                  </Label>
                  <AvField id="flight-arrivalAirport" type="text" name="arrivalAirport" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/flight" replace color="info">
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
  flightEntity: storeState.flight.entity,
  loading: storeState.flight.loading,
  updating: storeState.flight.updating
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
)(FlightUpdate);

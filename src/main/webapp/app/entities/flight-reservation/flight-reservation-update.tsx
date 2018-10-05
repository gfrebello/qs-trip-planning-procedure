import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './flight-reservation.reducer';
import { IFlightReservation } from 'app/shared/model/flight-reservation.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFlightReservationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IFlightReservationUpdateState {
  isNew: boolean;
}

export class FlightReservationUpdate extends React.Component<IFlightReservationUpdateProps, IFlightReservationUpdateState> {
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
    if (errors.length === 0) {
      const { flightReservationEntity } = this.props;
      const entity = {
        ...flightReservationEntity,
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
    this.props.history.push('/entity/flight-reservation');
  };

  render() {
    const { flightReservationEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tripPlanningApp.flightReservation.home.createOrEditLabel">
              <Translate contentKey="tripPlanningApp.flightReservation.home.createOrEditLabel">
                Create or edit a FlightReservation
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : flightReservationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="flight-reservation-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="reservationIdLabel" for="reservationId">
                    <Translate contentKey="tripPlanningApp.flightReservation.reservationId">Reservation Id</Translate>
                  </Label>
                  <AvField id="flight-reservation-reservationId" type="text" name="reservationId" />
                </AvGroup>
                <AvGroup>
                  <Label id="numberOfPeopleLabel" for="numberOfPeople">
                    <Translate contentKey="tripPlanningApp.flightReservation.numberOfPeople">Number Of People</Translate>
                  </Label>
                  <AvField id="flight-reservation-numberOfPeople" type="number" className="form-control" name="numberOfPeople" />
                </AvGroup>
                <AvGroup>
                  <Label id="customerClassLabel" for="customerClass">
                    <Translate contentKey="tripPlanningApp.flightReservation.customerClass">Customer Class</Translate>
                  </Label>
                  <AvField id="flight-reservation-customerClass" type="text" name="customerClass" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/flight-reservation" replace color="info">
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
  flightReservationEntity: storeState.flightReservation.entity,
  loading: storeState.flightReservation.loading,
  updating: storeState.flightReservation.updating
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
)(FlightReservationUpdate);
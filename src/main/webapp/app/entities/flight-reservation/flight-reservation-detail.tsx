import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './flight-reservation.reducer';
import { IFlightReservation } from 'app/shared/model/flight-reservation.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFlightReservationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class FlightReservationDetail extends React.Component<IFlightReservationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { flightReservationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tripPlanningApp.flightReservation.detail.title">FlightReservation</Translate> [
            <b>{flightReservationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="numberOfExecutive">
                <Translate contentKey="tripPlanningApp.flightReservation.numberOfExecutive">Number Of Executive</Translate>
              </span>
            </dt>
            <dd>{flightReservationEntity.numberOfExecutive}</dd>
            <dt>
              <span id="numberOfEconomic">
                <Translate contentKey="tripPlanningApp.flightReservation.numberOfEconomic">Number Of Economic</Translate>
              </span>
            </dt>
            <dd>{flightReservationEntity.numberOfEconomic}</dd>
            <dt>
              <span id="totalPrice">
                <Translate contentKey="tripPlanningApp.flightReservation.totalPrice">Total Price</Translate>
              </span>
            </dt>
            <dd>{flightReservationEntity.totalPrice}</dd>
            <dt>
              <Translate contentKey="tripPlanningApp.flightReservation.flight">Flight</Translate>
            </dt>
            <dd>{flightReservationEntity.flight ? flightReservationEntity.flight.flightCode : ''}</dd>
            <dt>
              <Translate contentKey="tripPlanningApp.flightReservation.trip">Trip</Translate>
            </dt>
            <dd>{flightReservationEntity.trip ? flightReservationEntity.trip.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/flight-reservation" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/flight-reservation/${flightReservationEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ flightReservation }: IRootState) => ({
  flightReservationEntity: flightReservation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightReservationDetail);

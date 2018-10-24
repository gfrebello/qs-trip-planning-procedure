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
            <Translate contentKey="tripPlanningApp.flightReservation.detail.title">FlightReservation</Translate> [<b>
              {flightReservationEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="reservationId">
                <Translate contentKey="tripPlanningApp.flightReservation.reservationId">Reservation Id</Translate>
              </span>
            </dt>
            <dd>{flightReservationEntity.reservationId}</dd>
            <dt>
              <span id="numberOfPeople">
                <Translate contentKey="tripPlanningApp.flightReservation.numberOfPeople">Number Of People</Translate>
              </span>
            </dt>
            <dd>{flightReservationEntity.numberOfPeople}</dd>
            <dt>
              <span id="customerClass">
                <Translate contentKey="tripPlanningApp.flightReservation.customerClass">Customer Class</Translate>
              </span>
            </dt>
            <dd>{flightReservationEntity.customerClass}</dd>
            <dt>
              <Translate contentKey="tripPlanningApp.flightReservation.flight">Flight</Translate>
            </dt>
            <dd>
              {flightReservationEntity.flights
                ? flightReservationEntity.flights.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === flightReservationEntity.flights.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/flight-reservation" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
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

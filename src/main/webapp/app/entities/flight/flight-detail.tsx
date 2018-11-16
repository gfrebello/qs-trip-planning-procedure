import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './flight.reducer';
import { IFlight } from 'app/shared/model/flight.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFlightDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class FlightDetail extends React.Component<IFlightDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { flightEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tripPlanningApp.flight.detail.title">Flight</Translate> [<b>{flightEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="company">
                <Translate contentKey="tripPlanningApp.flight.company">Company</Translate>
              </span>
            </dt>
            <dd>{flightEntity.company}</dd>
            <dt>
              <span id="origin">
                <Translate contentKey="tripPlanningApp.flight.origin">Origin</Translate>
              </span>
            </dt>
            <dd>{flightEntity.origin}</dd>
            <dt>
              <span id="destination">
                <Translate contentKey="tripPlanningApp.flight.destination">Destination</Translate>
              </span>
            </dt>
            <dd>{flightEntity.destination}</dd>
            <dt>
              <span id="availableSeats">
                <Translate contentKey="tripPlanningApp.flight.availableSeats">Available Seats</Translate>
              </span>
            </dt>
            <dd>{flightEntity.availableSeats}</dd>
            <dt>
              <span id="departureDate">
                <Translate contentKey="tripPlanningApp.flight.departureDate">Departure Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={flightEntity.departureDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="arrivalDate">
                <Translate contentKey="tripPlanningApp.flight.arrivalDate">Arrival Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={flightEntity.arrivalDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="flightCode">
                <Translate contentKey="tripPlanningApp.flight.flightCode">Flight Code</Translate>
              </span>
            </dt>
            <dd>{flightEntity.flightCode}</dd>
            <dt>
              <span id="departAirport">
                <Translate contentKey="tripPlanningApp.flight.departAirport">Depart Airport</Translate>
              </span>
            </dt>
            <dd>{flightEntity.departAirport}</dd>
            <dt>
              <span id="arrivalAirport">
                <Translate contentKey="tripPlanningApp.flight.arrivalAirport">Arrival Airport</Translate>
              </span>
            </dt>
            <dd>{flightEntity.arrivalAirport}</dd>
            <dt>
              <span id="price">
                <Translate contentKey="tripPlanningApp.flight.price">Price</Translate>
              </span>
            </dt>
            <dd>{flightEntity.price}</dd>
          </dl>
          <Button tag={Link} to="/entity/flight" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/flight/${flightEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ flight }: IRootState) => ({
  flightEntity: flight.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightDetail);

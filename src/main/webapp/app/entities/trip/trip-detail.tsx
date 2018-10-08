import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './trip.reducer';
import { ITrip } from 'app/shared/model/trip.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITripDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TripDetail extends React.Component<ITripDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tripEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tripPlanningApp.trip.detail.title">Trip</Translate> [<b>{tripEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="tripId">
                <Translate contentKey="tripPlanningApp.trip.tripId">Trip Id</Translate>
              </span>
            </dt>
            <dd>{tripEntity.tripId}</dd>
            <dt>
              <span id="paymentDone">
                <Translate contentKey="tripPlanningApp.trip.paymentDone">Payment Done</Translate>
              </span>
            </dt>
            <dd>{tripEntity.paymentDone ? 'true' : 'false'}</dd>
            <dt>
              <span id="numberOfPeople">
                <Translate contentKey="tripPlanningApp.trip.numberOfPeople">Number Of People</Translate>
              </span>
            </dt>
            <dd>{tripEntity.numberOfPeople}</dd>
            <dt>
              <span id="departureDate">
                <Translate contentKey="tripPlanningApp.trip.departureDate">Departure Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={tripEntity.departureDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="returnDate">
                <Translate contentKey="tripPlanningApp.trip.returnDate">Return Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={tripEntity.returnDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="origin">
                <Translate contentKey="tripPlanningApp.trip.origin">Origin</Translate>
              </span>
            </dt>
            <dd>{tripEntity.origin}</dd>
            <dt>
              <span id="destination">
                <Translate contentKey="tripPlanningApp.trip.destination">Destination</Translate>
              </span>
            </dt>
            <dd>{tripEntity.destination}</dd>
          </dl>
          <Button tag={Link} to="/entity/trip" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/trip/${tripEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ trip }: IRootState) => ({
  tripEntity: trip.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripDetail);

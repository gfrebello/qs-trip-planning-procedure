import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './attraction-reservation.reducer';
import { IAttractionReservation } from 'app/shared/model/attraction-reservation.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAttractionReservationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class AttractionReservationDetail extends React.Component<IAttractionReservationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { attractionReservationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tripPlanningApp.attractionReservation.detail.title">AttractionReservation</Translate> [<b>
              {attractionReservationEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="isReserved">
                <Translate contentKey="tripPlanningApp.attractionReservation.isReserved">Is Reserved</Translate>
              </span>
            </dt>
            <dd>{attractionReservationEntity.isReserved ? 'true' : 'false'}</dd>
            <dt>
              <span id="reservationDate">
                <Translate contentKey="tripPlanningApp.attractionReservation.reservationDate">Reservation Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={attractionReservationEntity.reservationDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="tripPlanningApp.attractionReservation.attraction">Attraction</Translate>
            </dt>
            <dd>{attractionReservationEntity.attraction ? attractionReservationEntity.attraction.name : ''}</dd>
            <dt>
              <Translate contentKey="tripPlanningApp.attractionReservation.trip">Trip</Translate>
            </dt>
            <dd>{attractionReservationEntity.trip ? attractionReservationEntity.trip.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/attraction-reservation" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/attraction-reservation/${attractionReservationEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ attractionReservation }: IRootState) => ({
  attractionReservationEntity: attractionReservation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttractionReservationDetail);

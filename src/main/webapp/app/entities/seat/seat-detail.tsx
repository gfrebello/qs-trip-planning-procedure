import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './seat.reducer';
import { ISeat } from 'app/shared/model/seat.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISeatDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class SeatDetail extends React.Component<ISeatDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { seatEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tripPlanningApp.seat.detail.title">Seat</Translate> [<b>{seatEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="number">
                <Translate contentKey="tripPlanningApp.seat.number">Number</Translate>
              </span>
            </dt>
            <dd>{seatEntity.number}</dd>
            <dt>
              <span id="row">
                <Translate contentKey="tripPlanningApp.seat.row">Row</Translate>
              </span>
            </dt>
            <dd>{seatEntity.row}</dd>
            <dt>
              <span id="customerClass">
                <Translate contentKey="tripPlanningApp.seat.customerClass">Customer Class</Translate>
              </span>
            </dt>
            <dd>{seatEntity.customerClass}</dd>
            <dt>
              <span id="isReserved">
                <Translate contentKey="tripPlanningApp.seat.isReserved">Is Reserved</Translate>
              </span>
            </dt>
            <dd>{seatEntity.isReserved ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="tripPlanningApp.seat.flight">Flight</Translate>
            </dt>
            <dd>{seatEntity.flight ? seatEntity.flight.id : ''}</dd>
            <dt>
              <Translate contentKey="tripPlanningApp.seat.flightReservation">Flight Reservation</Translate>
            </dt>
            <dd>{seatEntity.flightReservation ? seatEntity.flightReservation.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/seat" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/seat/${seatEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ seat }: IRootState) => ({
  seatEntity: seat.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeatDetail);

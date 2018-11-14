import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './passenger.reducer';
import { IPassenger } from 'app/shared/model/passenger.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPassengerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class PassengerDetail extends React.Component<IPassengerDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { passengerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tripPlanningApp.passenger.detail.title">Passenger</Translate> [<b>{passengerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="tripPlanningApp.passenger.name">Name</Translate>
              </span>
            </dt>
            <dd>{passengerEntity.name}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="tripPlanningApp.passenger.email">Email</Translate>
              </span>
            </dt>
            <dd>{passengerEntity.email}</dd>
            <dt>
              <span id="phoneNumber">
                <Translate contentKey="tripPlanningApp.passenger.phoneNumber">Phone Number</Translate>
              </span>
            </dt>
            <dd>{passengerEntity.phoneNumber}</dd>
            <dt>
              <span id="passport">
                <Translate contentKey="tripPlanningApp.passenger.passport">Passport</Translate>
              </span>
            </dt>
            <dd>{passengerEntity.passport}</dd>
            <dt>
              <Translate contentKey="tripPlanningApp.passenger.trip">Trip</Translate>
            </dt>
            <dd>{passengerEntity.trip ? passengerEntity.trip.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/passenger" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/passenger/${passengerEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ passenger }: IRootState) => ({
  passengerEntity: passenger.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassengerDetail);

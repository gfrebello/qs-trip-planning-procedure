import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './hotel.reducer';
import { IHotel } from 'app/shared/model/hotel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHotelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class HotelDetail extends React.Component<IHotelDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { hotelEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tripPlanningApp.hotel.detail.title">Hotel</Translate> [<b>{hotelEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="tripPlanningApp.hotel.name">Name</Translate>
              </span>
            </dt>
            <dd>{hotelEntity.name}</dd>
            <dt>
              <span id="city">
                <Translate contentKey="tripPlanningApp.hotel.city">City</Translate>
              </span>
            </dt>
            <dd>{hotelEntity.city}</dd>
            <dt>
              <span id="address">
                <Translate contentKey="tripPlanningApp.hotel.address">Address</Translate>
              </span>
            </dt>
            <dd>{hotelEntity.address}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="tripPlanningApp.hotel.type">Type</Translate>
              </span>
            </dt>
            <dd>{hotelEntity.type}</dd>
          </dl>
          <Button tag={Link} to="/entity/hotel" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/hotel/${hotelEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ hotel }: IRootState) => ({
  hotelEntity: hotel.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelDetail);

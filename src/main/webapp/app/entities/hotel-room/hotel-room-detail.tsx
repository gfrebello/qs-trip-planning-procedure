import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './hotel-room.reducer';
import { IHotelRoom } from 'app/shared/model/hotel-room.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHotelRoomDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class HotelRoomDetail extends React.Component<IHotelRoomDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { hotelRoomEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tripPlanningApp.hotelRoom.detail.title">HotelRoom</Translate> [<b>{hotelRoomEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="maxCapacity">
                <Translate contentKey="tripPlanningApp.hotelRoom.maxCapacity">Max Capacity</Translate>
              </span>
            </dt>
            <dd>{hotelRoomEntity.maxCapacity}</dd>
            <dt>
              <span id="isReserved">
                <Translate contentKey="tripPlanningApp.hotelRoom.isReserved">Is Reserved</Translate>
              </span>
            </dt>
            <dd>{hotelRoomEntity.isReserved ? 'true' : 'false'}</dd>
            <dt>
              <span id="roomType">
                <Translate contentKey="tripPlanningApp.hotelRoom.roomType">Room Type</Translate>
              </span>
            </dt>
            <dd>{hotelRoomEntity.roomType}</dd>
            <dt>
              <span id="price">
                <Translate contentKey="tripPlanningApp.hotelRoom.price">Price</Translate>
              </span>
            </dt>
            <dd>{hotelRoomEntity.price}</dd>
            <dt>
              <Translate contentKey="tripPlanningApp.hotelRoom.hotel">Hotel</Translate>
            </dt>
            <dd>{hotelRoomEntity.hotel ? hotelRoomEntity.hotel.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/hotel-room" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/hotel-room/${hotelRoomEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ hotelRoom }: IRootState) => ({
  hotelRoomEntity: hotelRoom.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelRoomDetail);

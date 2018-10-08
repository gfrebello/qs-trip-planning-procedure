import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './hotel-room.reducer';
import { IHotelRoom } from 'app/shared/model/hotel-room.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHotelRoomProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class HotelRoom extends React.Component<IHotelRoomProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { hotelRoomList, match } = this.props;
    return (
      <div>
        <h2 id="hotel-room-heading">
          <Translate contentKey="tripPlanningApp.hotelRoom.home.title">Hotel Rooms</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="tripPlanningApp.hotelRoom.home.createLabel">Create new Hotel Room</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.hotelRoom.numberOfPeople">Number Of People</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.hotelRoom.price">Price</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.hotelRoom.available">Available</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.hotelRoom.type">Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {hotelRoomList.map((hotelRoom, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${hotelRoom.id}`} color="link" size="sm">
                      {hotelRoom.id}
                    </Button>
                  </td>
                  <td>{hotelRoom.numberOfPeople}</td>
                  <td>{hotelRoom.price}</td>
                  <td>{hotelRoom.available ? 'true' : 'false'}</td>
                  <td>{hotelRoom.type}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${hotelRoom.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${hotelRoom.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${hotelRoom.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ hotelRoom }: IRootState) => ({
  hotelRoomList: hotelRoom.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelRoom);

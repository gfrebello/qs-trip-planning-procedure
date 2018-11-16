import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './passenger.reducer';
import { IPassenger } from 'app/shared/model/passenger.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPassengerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Passenger extends React.Component<IPassengerProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { passengerList, match } = this.props;
    return (
      <div>
        <h2 id="passenger-heading">
          <Translate contentKey="tripPlanningApp.passenger.home.title">Passengers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="tripPlanningApp.passenger.home.createLabel">Create new Passenger</Translate>
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
                  <Translate contentKey="tripPlanningApp.passenger.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.passenger.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.passenger.phoneNumber">Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.passenger.passport">Passport</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.passenger.trip">Trip</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {passengerList.map((passenger, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${passenger.id}`} color="link" size="sm">
                      {passenger.id}
                    </Button>
                  </td>
                  <td>{passenger.name}</td>
                  <td>{passenger.email}</td>
                  <td>{passenger.phoneNumber}</td>
                  <td>{passenger.passport}</td>
                  <td>{passenger.trip ? <Link to={`trip/${passenger.trip.id}`}>{passenger.trip.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${passenger.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${passenger.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${passenger.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ passenger }: IRootState) => ({
  passengerList: passenger.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Passenger);

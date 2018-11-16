import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './car-rental.reducer';
import { ICarRental } from 'app/shared/model/car-rental.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICarRentalProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CarRental extends React.Component<ICarRentalProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { carRentalList, match } = this.props;
    return (
      <div>
        <h2 id="car-rental-heading">
          <Translate contentKey="tripPlanningApp.carRental.home.title">Car Rentals</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="tripPlanningApp.carRental.home.createLabel">Create new Car Rental</Translate>
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
                  <Translate contentKey="tripPlanningApp.carRental.carType">Car Type</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.carRental.rentalDays">Rental Days</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.carRental.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.carRental.price">Price</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.carRental.pickupAddress">Pickup Address</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.carRental.dropoffAddress">Dropoff Address</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.carRental.color">Color</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.carRental.trip">Trip</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {carRentalList.map((carRental, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${carRental.id}`} color="link" size="sm">
                      {carRental.id}
                    </Button>
                  </td>
                  <td>{carRental.carType}</td>
                  <td>{carRental.rentalDays}</td>
                  <td>
                    <TextFormat type="date" value={carRental.startDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{carRental.price}</td>
                  <td>{carRental.pickupAddress}</td>
                  <td>{carRental.dropoffAddress}</td>
                  <td>{carRental.color}</td>
                  <td>{carRental.trip ? <Link to={`trip/${carRental.trip.id}`}>{carRental.trip.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${carRental.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${carRental.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${carRental.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ carRental }: IRootState) => ({
  carRentalList: carRental.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarRental);

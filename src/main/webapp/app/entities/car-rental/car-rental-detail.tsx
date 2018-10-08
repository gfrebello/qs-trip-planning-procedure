import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './car-rental.reducer';
import { ICarRental } from 'app/shared/model/car-rental.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICarRentalDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CarRentalDetail extends React.Component<ICarRentalDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { carRentalEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tripPlanningApp.carRental.detail.title">CarRental</Translate> [<b>{carRentalEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="carType">
                <Translate contentKey="tripPlanningApp.carRental.carType">Car Type</Translate>
              </span>
            </dt>
            <dd>{carRentalEntity.carType}</dd>
            <dt>
              <span id="rentalDays">
                <Translate contentKey="tripPlanningApp.carRental.rentalDays">Rental Days</Translate>
              </span>
            </dt>
            <dd>{carRentalEntity.rentalDays}</dd>
            <dt>
              <span id="startDate">
                <Translate contentKey="tripPlanningApp.carRental.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={carRentalEntity.startDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="price">
                <Translate contentKey="tripPlanningApp.carRental.price">Price</Translate>
              </span>
            </dt>
            <dd>{carRentalEntity.price}</dd>
            <dt>
              <span id="pickupAddress">
                <Translate contentKey="tripPlanningApp.carRental.pickupAddress">Pickup Address</Translate>
              </span>
            </dt>
            <dd>{carRentalEntity.pickupAddress}</dd>
            <dt>
              <span id="dropoffAddress">
                <Translate contentKey="tripPlanningApp.carRental.dropoffAddress">Dropoff Address</Translate>
              </span>
            </dt>
            <dd>{carRentalEntity.dropoffAddress}</dd>
            <dt>
              <span id="color">
                <Translate contentKey="tripPlanningApp.carRental.color">Color</Translate>
              </span>
            </dt>
            <dd>{carRentalEntity.color}</dd>
          </dl>
          <Button tag={Link} to="/entity/car-rental" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/car-rental/${carRentalEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ carRental }: IRootState) => ({
  carRentalEntity: carRental.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarRentalDetail);

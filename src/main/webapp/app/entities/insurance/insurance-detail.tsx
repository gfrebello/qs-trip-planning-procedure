import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './insurance.reducer';
import { IInsurance } from 'app/shared/model/insurance.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInsuranceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class InsuranceDetail extends React.Component<IInsuranceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { insuranceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tripPlanningApp.insurance.detail.title">Insurance</Translate> [<b>{insuranceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="type">
                <Translate contentKey="tripPlanningApp.insurance.type">Type</Translate>
              </span>
            </dt>
            <dd>{insuranceEntity.type}</dd>
            <dt>
              <span id="price">
                <Translate contentKey="tripPlanningApp.insurance.price">Price</Translate>
              </span>
            </dt>
            <dd>{insuranceEntity.price}</dd>
            <dt>
              <span id="personName">
                <Translate contentKey="tripPlanningApp.insurance.personName">Person Name</Translate>
              </span>
            </dt>
            <dd>{insuranceEntity.personName}</dd>
            <dt>
              <span id="startDate">
                <Translate contentKey="tripPlanningApp.insurance.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={insuranceEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDate">
                <Translate contentKey="tripPlanningApp.insurance.endDate">End Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={insuranceEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="tripPlanningApp.insurance.trip">Trip</Translate>
            </dt>
            <dd>{insuranceEntity.trip ? insuranceEntity.trip.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/insurance" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/insurance/${insuranceEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ insurance }: IRootState) => ({
  insuranceEntity: insurance.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsuranceDetail);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './check-payment.reducer';
import { ICheckPayment } from 'app/shared/model/check-payment.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICheckPaymentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CheckPaymentDetail extends React.Component<ICheckPaymentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { checkPaymentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tripPlanningApp.checkPayment.detail.title">CheckPayment</Translate> [<b>{checkPaymentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="tripPlanningApp.checkPayment.name">Name</Translate>
              </span>
            </dt>
            <dd>{checkPaymentEntity.name}</dd>
            <dt>
              <span id="bankId">
                <Translate contentKey="tripPlanningApp.checkPayment.bankId">Bank Id</Translate>
              </span>
            </dt>
            <dd>{checkPaymentEntity.bankId}</dd>
          </dl>
          <Button tag={Link} to="/entity/check-payment" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/check-payment/${checkPaymentEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ checkPayment }: IRootState) => ({
  checkPaymentEntity: checkPayment.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckPaymentDetail);

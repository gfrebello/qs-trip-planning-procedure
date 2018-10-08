import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './paycheck.reducer';
import { IPaycheck } from 'app/shared/model/paycheck.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaycheckDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class PaycheckDetail extends React.Component<IPaycheckDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { paycheckEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tripPlanningApp.paycheck.detail.title">Paycheck</Translate> [<b>{paycheckEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="tripPlanningApp.paycheck.name">Name</Translate>
              </span>
            </dt>
            <dd>{paycheckEntity.name}</dd>
            <dt>
              <span id="bankId">
                <Translate contentKey="tripPlanningApp.paycheck.bankId">Bank Id</Translate>
              </span>
            </dt>
            <dd>{paycheckEntity.bankId}</dd>
          </dl>
          <Button tag={Link} to="/entity/paycheck" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/paycheck/${paycheckEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ paycheck }: IRootState) => ({
  paycheckEntity: paycheck.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaycheckDetail);

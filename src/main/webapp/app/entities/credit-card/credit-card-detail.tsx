import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './credit-card.reducer';
import { ICreditCard } from 'app/shared/model/credit-card.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICreditCardDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CreditCardDetail extends React.Component<ICreditCardDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { creditCardEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tripPlanningApp.creditCard.detail.title">CreditCard</Translate> [<b>{creditCardEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="tripPlanningApp.creditCard.name">Name</Translate>
              </span>
            </dt>
            <dd>{creditCardEntity.name}</dd>
            <dt>
              <span id="cardNumber">
                <Translate contentKey="tripPlanningApp.creditCard.cardNumber">Card Number</Translate>
              </span>
            </dt>
            <dd>{creditCardEntity.cardNumber}</dd>
            <dt>
              <span id="safetyCode">
                <Translate contentKey="tripPlanningApp.creditCard.safetyCode">Safety Code</Translate>
              </span>
            </dt>
            <dd>{creditCardEntity.safetyCode}</dd>
            <dt>
              <span id="expirationDate">
                <Translate contentKey="tripPlanningApp.creditCard.expirationDate">Expiration Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={creditCardEntity.expirationDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/credit-card" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/credit-card/${creditCardEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ creditCard }: IRootState) => ({
  creditCardEntity: creditCard.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditCardDetail);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './credit-card.reducer';
import { ICreditCard } from 'app/shared/model/credit-card.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICreditCardUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICreditCardUpdateState {
  isNew: boolean;
}

export class CreditCardUpdate extends React.Component<ICreditCardUpdateProps, ICreditCardUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    values.expirationDate = new Date(values.expirationDate);

    if (errors.length === 0) {
      const { creditCardEntity } = this.props;
      const entity = {
        ...creditCardEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/credit-card');
  };

  render() {
    const { creditCardEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tripPlanningApp.creditCard.home.createOrEditLabel">
              <Translate contentKey="tripPlanningApp.creditCard.home.createOrEditLabel">Create or edit a CreditCard</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : creditCardEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="credit-card-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="tripPlanningApp.creditCard.name">Name</Translate>
                  </Label>
                  <AvField id="credit-card-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="cardNumberLabel" for="cardNumber">
                    <Translate contentKey="tripPlanningApp.creditCard.cardNumber">Card Number</Translate>
                  </Label>
                  <AvField id="credit-card-cardNumber" type="text" name="cardNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="safetyCodeLabel" for="safetyCode">
                    <Translate contentKey="tripPlanningApp.creditCard.safetyCode">Safety Code</Translate>
                  </Label>
                  <AvField id="credit-card-safetyCode" type="text" name="safetyCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="expirationDateLabel" for="expirationDate">
                    <Translate contentKey="tripPlanningApp.creditCard.expirationDate">Expiration Date</Translate>
                  </Label>
                  <AvInput
                    id="credit-card-expirationDate"
                    type="datetime-local"
                    className="form-control"
                    name="expirationDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.creditCardEntity.expirationDate)}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/credit-card" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  creditCardEntity: storeState.creditCard.entity,
  loading: storeState.creditCard.loading,
  updating: storeState.creditCard.updating
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditCardUpdate);

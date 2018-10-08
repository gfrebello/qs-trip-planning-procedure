import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './choosen-attraction.reducer';
import { IChoosenAttraction } from 'app/shared/model/choosen-attraction.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChoosenAttractionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IChoosenAttractionUpdateState {
  isNew: boolean;
}

export class ChoosenAttractionUpdate extends React.Component<IChoosenAttractionUpdateProps, IChoosenAttractionUpdateState> {
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
    values.reservationDate = new Date(values.reservationDate);

    if (errors.length === 0) {
      const { choosenAttractionEntity } = this.props;
      const entity = {
        ...choosenAttractionEntity,
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
    this.props.history.push('/entity/choosen-attraction');
  };

  render() {
    const { choosenAttractionEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tripPlanningApp.choosenAttraction.home.createOrEditLabel">
              <Translate contentKey="tripPlanningApp.choosenAttraction.home.createOrEditLabel">
                Create or edit a ChoosenAttraction
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : choosenAttractionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="choosen-attraction-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="isReservedLabel" check>
                    <AvInput id="choosen-attraction-isReserved" type="checkbox" className="form-control" name="isReserved" />
                    <Translate contentKey="tripPlanningApp.choosenAttraction.isReserved">Is Reserved</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="reservationDateLabel" for="reservationDate">
                    <Translate contentKey="tripPlanningApp.choosenAttraction.reservationDate">Reservation Date</Translate>
                  </Label>
                  <AvInput
                    id="choosen-attraction-reservationDate"
                    type="datetime-local"
                    className="form-control"
                    name="reservationDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.choosenAttractionEntity.reservationDate)}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/choosen-attraction" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
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
  choosenAttractionEntity: storeState.choosenAttraction.entity,
  loading: storeState.choosenAttraction.loading,
  updating: storeState.choosenAttraction.updating
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
)(ChoosenAttractionUpdate);

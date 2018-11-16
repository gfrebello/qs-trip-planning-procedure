import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './trip.reducer';
import { ITrip } from 'app/shared/model/trip.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITripUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ITripUpdateState {
  isNew: boolean;
  userId: number;
}

export class TripUpdate extends React.Component<ITripUpdateProps, ITripUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { tripEntity } = this.props;
      const entity = {
        ...tripEntity,
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
    this.props.history.push('/entity/trip');
  };

  render() {
    const { tripEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tripPlanningApp.trip.home.createOrEditLabel">
              <Translate contentKey="tripPlanningApp.trip.home.createOrEditLabel">Create or edit a Trip</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : tripEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="trip-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="numberOfPeopleLabel" for="numberOfPeople">
                    <Translate contentKey="tripPlanningApp.trip.numberOfPeople">Number Of People</Translate>
                  </Label>
                  <AvField id="trip-numberOfPeople" type="number" className="form-control" name="numberOfPeople" />
                </AvGroup>
                <AvGroup>
                  <Label id="departureDateLabel" for="departureDate">
                    <Translate contentKey="tripPlanningApp.trip.departureDate">Departure Date</Translate>
                  </Label>
                  <AvField id="trip-departureDate" type="date" className="form-control" name="departureDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="returnDateLabel" for="returnDate">
                    <Translate contentKey="tripPlanningApp.trip.returnDate">Return Date</Translate>
                  </Label>
                  <AvField id="trip-returnDate" type="date" className="form-control" name="returnDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="originLabel" for="origin">
                    <Translate contentKey="tripPlanningApp.trip.origin">Origin</Translate>
                  </Label>
                  <AvField id="trip-origin" type="text" name="origin" />
                </AvGroup>
                <AvGroup>
                  <Label id="destinationLabel" for="destination">
                    <Translate contentKey="tripPlanningApp.trip.destination">Destination</Translate>
                  </Label>
                  <AvField id="trip-destination" type="text" name="destination" />
                </AvGroup>
                <AvGroup>
                  <Label for="user.login">
                    <Translate contentKey="tripPlanningApp.trip.user">User</Translate>
                  </Label>
                  <AvInput
                    id="trip-user"
                    type="select"
                    className="form-control"
                    name="user.id"
                    value={isNew ? users[0] && users[0].id : tripEntity.user.id}
                  >
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/trip" replace color="info">
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
  users: storeState.userManagement.users,
  tripEntity: storeState.trip.entity,
  loading: storeState.trip.loading,
  updating: storeState.trip.updating
});

const mapDispatchToProps = {
  getUsers,
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
)(TripUpdate);

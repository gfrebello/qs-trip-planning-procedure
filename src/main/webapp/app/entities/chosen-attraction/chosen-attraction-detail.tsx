import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './chosen-attraction.reducer';
import { IChosenAttraction } from 'app/shared/model/chosen-attraction.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChosenAttractionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ChosenAttractionDetail extends React.Component<IChosenAttractionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { chosenAttractionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tripPlanningApp.chosenAttraction.detail.title">ChosenAttraction</Translate> [<b>
              {chosenAttractionEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="isReserved">
                <Translate contentKey="tripPlanningApp.chosenAttraction.isReserved">Is Reserved</Translate>
              </span>
            </dt>
            <dd>{chosenAttractionEntity.isReserved ? 'true' : 'false'}</dd>
            <dt>
              <span id="reservationDate">
                <Translate contentKey="tripPlanningApp.chosenAttraction.reservationDate">Reservation Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={chosenAttractionEntity.reservationDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="tripPlanningApp.chosenAttraction.attraction">Attraction</Translate>
            </dt>
            <dd>{chosenAttractionEntity.attraction ? chosenAttractionEntity.attraction.id : ''}</dd>
            <dt>
              <Translate contentKey="tripPlanningApp.chosenAttraction.trip">Trip</Translate>
            </dt>
            <dd>{chosenAttractionEntity.trip ? chosenAttractionEntity.trip.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/chosen-attraction" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/chosen-attraction/${chosenAttractionEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ chosenAttraction }: IRootState) => ({
  chosenAttractionEntity: chosenAttraction.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChosenAttractionDetail);

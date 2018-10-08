import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './attraction.reducer';
import { IAttraction } from 'app/shared/model/attraction.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAttractionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class AttractionDetail extends React.Component<IAttractionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { attractionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tripPlanningApp.attraction.detail.title">Attraction</Translate> [<b>{attractionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="tripPlanningApp.attraction.name">Name</Translate>
              </span>
            </dt>
            <dd>{attractionEntity.name}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="tripPlanningApp.attraction.type">Type</Translate>
              </span>
            </dt>
            <dd>{attractionEntity.type}</dd>
            <dt>
              <span id="city">
                <Translate contentKey="tripPlanningApp.attraction.city">City</Translate>
              </span>
            </dt>
            <dd>{attractionEntity.city}</dd>
            <dt>
              <span id="price">
                <Translate contentKey="tripPlanningApp.attraction.price">Price</Translate>
              </span>
            </dt>
            <dd>{attractionEntity.price}</dd>
          </dl>
          <Button tag={Link} to="/entity/attraction" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/attraction/${attractionEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ attraction }: IRootState) => ({
  attractionEntity: attraction.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttractionDetail);

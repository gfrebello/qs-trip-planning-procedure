import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './attraction.reducer';
import { IAttraction } from 'app/shared/model/attraction.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAttractionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Attraction extends React.Component<IAttractionProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { attractionList, match } = this.props;
    return (
      <div>
        <h2 id="attraction-heading">
          <Translate contentKey="tripPlanningApp.attraction.home.title">Attractions</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="tripPlanningApp.attraction.home.createLabel">Create new Attraction</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.attraction.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.attraction.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.attraction.city">City</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.attraction.price">Price</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {attractionList.map((attraction, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${attraction.id}`} color="link" size="sm">
                      {attraction.id}
                    </Button>
                  </td>
                  <td>{attraction.name}</td>
                  <td>{attraction.type}</td>
                  <td>{attraction.city}</td>
                  <td>{attraction.price}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${attraction.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${attraction.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${attraction.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ attraction }: IRootState) => ({
  attractionList: attraction.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Attraction);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './chosen-attraction.reducer';
import { IChosenAttraction } from 'app/shared/model/chosen-attraction.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChosenAttractionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ChosenAttraction extends React.Component<IChosenAttractionProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { chosenAttractionList, match } = this.props;
    return (
      <div>
        <h2 id="chosen-attraction-heading">
          <Translate contentKey="tripPlanningApp.chosenAttraction.home.title">Chosen Attractions</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="tripPlanningApp.chosenAttraction.home.createLabel">Create new Chosen Attraction</Translate>
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
                  <Translate contentKey="tripPlanningApp.chosenAttraction.isReserved">Is Reserved</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.chosenAttraction.reservationDate">Reservation Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.chosenAttraction.attraction">Attraction</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.chosenAttraction.trip">Trip</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {chosenAttractionList.map((chosenAttraction, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${chosenAttraction.id}`} color="link" size="sm">
                      {chosenAttraction.id}
                    </Button>
                  </td>
                  <td>{chosenAttraction.isReserved ? 'true' : 'false'}</td>
                  <td>
                    <TextFormat type="date" value={chosenAttraction.reservationDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    {chosenAttraction.attraction ? (
                      <Link to={`attraction/${chosenAttraction.attraction.id}`}>{chosenAttraction.attraction.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{chosenAttraction.trip ? <Link to={`trip/${chosenAttraction.trip.id}`}>{chosenAttraction.trip.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${chosenAttraction.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${chosenAttraction.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${chosenAttraction.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ chosenAttraction }: IRootState) => ({
  chosenAttractionList: chosenAttraction.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChosenAttraction);

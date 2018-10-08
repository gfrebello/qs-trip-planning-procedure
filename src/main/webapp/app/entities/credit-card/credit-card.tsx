import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './credit-card.reducer';
import { ICreditCard } from 'app/shared/model/credit-card.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICreditCardProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CreditCard extends React.Component<ICreditCardProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { creditCardList, match } = this.props;
    return (
      <div>
        <h2 id="credit-card-heading">
          <Translate contentKey="tripPlanningApp.creditCard.home.title">Credit Cards</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="tripPlanningApp.creditCard.home.createLabel">Create new Credit Card</Translate>
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
                  <Translate contentKey="tripPlanningApp.creditCard.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.creditCard.cardNumber">Card Number</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.creditCard.safetyCode">Safety Code</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.creditCard.expirationDate">Expiration Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {creditCardList.map((creditCard, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${creditCard.id}`} color="link" size="sm">
                      {creditCard.id}
                    </Button>
                  </td>
                  <td>{creditCard.name}</td>
                  <td>{creditCard.cardNumber}</td>
                  <td>{creditCard.safetyCode}</td>
                  <td>
                    <TextFormat type="date" value={creditCard.expirationDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${creditCard.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${creditCard.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${creditCard.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ creditCard }: IRootState) => ({
  creditCardList: creditCard.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditCard);

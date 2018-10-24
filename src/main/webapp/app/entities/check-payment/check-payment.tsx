import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './check-payment.reducer';
import { ICheckPayment } from 'app/shared/model/check-payment.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICheckPaymentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CheckPayment extends React.Component<ICheckPaymentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { checkPaymentList, match } = this.props;
    return (
      <div>
        <h2 id="check-payment-heading">
          <Translate contentKey="tripPlanningApp.checkPayment.home.title">Check Payments</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="tripPlanningApp.checkPayment.home.createLabel">Create new Check Payment</Translate>
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
                  <Translate contentKey="tripPlanningApp.checkPayment.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.checkPayment.bankId">Bank Id</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {checkPaymentList.map((checkPayment, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${checkPayment.id}`} color="link" size="sm">
                      {checkPayment.id}
                    </Button>
                  </td>
                  <td>{checkPayment.name}</td>
                  <td>{checkPayment.bankId}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${checkPayment.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${checkPayment.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${checkPayment.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ checkPayment }: IRootState) => ({
  checkPaymentList: checkPayment.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckPayment);

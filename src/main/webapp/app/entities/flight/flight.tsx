import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './flight.reducer';
import { IFlight } from 'app/shared/model/flight.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFlightProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Flight extends React.Component<IFlightProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { flightList, match } = this.props;
    return (
      <div>
        <h2 id="flight-heading">
          <Translate contentKey="tripPlanningApp.flight.home.title">Flights</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="tripPlanningApp.flight.home.createLabel">Create new Flight</Translate>
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
                  <Translate contentKey="tripPlanningApp.flight.company">Company</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.flight.origin">Origin</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.flight.destination">Destination</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.flight.avaibleSeats">Avaible Seats</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.flight.departureDate">Departure Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.flight.arrivalDate">Arrival Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.flight.flightCode">Flight Code</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.flight.departAirport">Depart Airport</Translate>
                </th>
                <th>
                  <Translate contentKey="tripPlanningApp.flight.arrivalAirport">Arrival Airport</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {flightList.map((flight, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${flight.id}`} color="link" size="sm">
                      {flight.id}
                    </Button>
                  </td>
                  <td>{flight.company}</td>
                  <td>{flight.origin}</td>
                  <td>{flight.destination}</td>
                  <td>{flight.avaibleSeats}</td>
                  <td>
                    <TextFormat type="date" value={flight.departureDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={flight.arrivalDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{flight.flightCode}</td>
                  <td>{flight.departAirport}</td>
                  <td>{flight.arrivalAirport}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${flight.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${flight.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${flight.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ flight }: IRootState) => ({
  flightList: flight.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flight);

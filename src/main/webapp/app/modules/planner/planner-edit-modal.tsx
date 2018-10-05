import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { handleSubmit, handleRedirect } from '../home/home.reducer';

const returnAfterDepart = (value, ctx) => {
  if (ctx.returnDate > ctx.departDate) {
    return true;
  }
  return 'Return date must be after departure date';
};
const originDestinationValidation = (value, ctx) => {
  if (ctx.origin !== ctx.destination) {
    return true;
  }
  return 'Origin and destination cannot be the same!';
};

export interface IEditPlanModalProps extends StateProps, DispatchProps {
  showModal: boolean;
  handleClose: Function;
}

export class PlannerEditModal extends React.Component<IEditPlanModalProps> {
  state = {
    form: null
  };
  constructor(props) {
    super(props);

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.validateDeparture = this.validateDeparture.bind(this);
    this.validateReturn = this.validateReturn.bind(this);
    this.validateOrigin = this.validateOrigin.bind(this);
    this.validateDestination = this.validateDestination.bind(this);
  }

  handleValidSubmit = (event, values) => {
    // If the submit is valid, sets the trip information, and the 'redirect' variable to true in the Redux store
    this.props.handleSubmit(values.origin, values.destination, values.departDate, values.returnDate, values.nPassengers);
    this.props.handleClose();
    event.preventDefault();
  };

  validateReturn = () => {
    this.state.form.validateInput('returnDate');
  };
  validateDeparture = () => {
    this.state.form.validateInput('departDate');
  };
  validateOrigin = () => {
    this.state.form.validateInput('origin');
  };
  validateDestination = () => {
    this.state.form.validateInput('destination');
  };

  render() {
    const { redirect } = this.props;

    if (redirect) {
      return <Redirect to="/planner" />;
    }

    const defaultValues = {
      origin: this.props.origin,
      destination: this.props.destination,
      departDate: this.props.departDate,
      returnDate: this.props.returnDate,
      nPassengers: this.props.nPassengers
    };

    return (
      <Modal isOpen={this.props.showModal} toggle={this.props.handleClose} backdrop="static" id="edit-plan-page" autoFocus={false}>
        <AvForm ref={c => (this.state.form = c)} id="edit-form" onValidSubmit={this.handleValidSubmit} model={defaultValues}>
          <ModalHeader id="edit-title" toggle={this.props.handleClose}>
            Edit Itinerary
          </ModalHeader>
          <ModalBody>
            <AvField
              name="origin"
              label="Origin"
              placeholder="Rio de Janeiro"
              type="search"
              validate={{
                required: { value: true, errorMessage: 'Origin not provided!' },
                minLength: { value: 3, errorMessage: 'Origin must have more than 3 characters.' },
                maxLength: { value: 30, errorMessage: 'Origin name is too big!' },
                myValidation: originDestinationValidation
              }}
              onChange={this.validateDestination}
            />
            <AvField
              name="destination"
              label="Destination"
              placeholder="Paris"
              type="search"
              validate={{
                required: { value: true, errorMessage: 'Destination not provided!' },
                minLength: { value: 3, errorMessage: 'Destination must have more than 3 characters.' },
                maxLength: { value: 30, errorMessage: 'Destination name is too big!' },
                myValidation: originDestinationValidation
              }}
              onChange={this.validateOrigin}
            />
            <AvField
              name="departDate"
              label="Departure Date"
              placeholder="date placeholder"
              type="date"
              validate={{
                required: { value: true, errorMessage: 'A departure date is required!' },
                dateRange: { start: { value: 0, units: 'years' }, end: { value: 1, units: 'years' } },
                myValidation: returnAfterDepart
              }}
              onChange={this.validateReturn}
            />
            <AvField
              name="returnDate"
              label="Return Date"
              placeholder="date placeholder"
              type="date"
              validate={{
                required: { value: true, errorMessage: 'A return date is required!' },
                dateRange: { start: { value: 0, units: 'years' }, end: { value: 1, units: 'years' } },
                myValidation: returnAfterDepart
              }}
              onChange={this.validateDeparture}
            />
            <AvField
              name="nPassengers"
              label="Number of Passengers"
              type="number"
              validate={{
                required: { value: true, errorMessage: 'Must provide number of passengers.' }
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.handleClose} tabIndex="1">
              Cancel
            </Button>{' '}
            <Button id="edit-submit" color="primary" type="submit">
              Finish Editing
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    );
  }
}

const mapStateToProps = storeState => ({
  redirect: storeState.home.redirect,
  origin: storeState.home.origin,
  destination: storeState.home.destination,
  departDate: storeState.home.departDate,
  returnDate: storeState.home.returnDate,
  nPassengers: storeState.home.nPassengers
});

const mapDispatchToProps = { handleSubmit, handleRedirect };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlannerEditModal);

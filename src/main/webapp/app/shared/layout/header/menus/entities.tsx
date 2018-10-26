import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <DropdownItem tag={Link} to="/entity/trip">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.trip" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/ticket">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.ticket" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/payment">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.payment" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/check-payment">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.checkPayment" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/credit-card">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.creditCard" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/flight-reservation">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.flightReservation" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/flight">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.flight" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/hotel-reservation">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.hotelReservation" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/hotel">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.hotel" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/hotel-room">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.hotelRoom" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/chosen-attraction">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.chosenAttraction" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/attraction">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.attraction" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/insurance">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.insurance" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/car-rental">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.carRental" />
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);

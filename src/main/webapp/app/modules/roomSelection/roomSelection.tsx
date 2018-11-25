import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { addSelectedHotel } from '../planner/planner.reducer';
import { getEntities } from '../../entities/hotel-room/hotel-room.reducer';
import { number } from 'prop-types';

export interface IRoomSelectionProps extends StateProps, DispatchProps {
  showRoomSelection: boolean;
  handleClose: Function;
}

export class RoomSelectionPage extends React.Component<IRoomSelectionProps> {
  state = {
    selectedRoomsIndexes: {},
    numberOfNights: 0
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEntities();
  }

  handleAddHotel = () => {
    // Also check for number of seats
    const { hSelected, hotelList, roomList, departDate, returnDate } = this.props;
    const { selectedRoomsIndexes } = this.state;
    if (hSelected !== -1) {
      const selectedHotel = hotelList[hSelected];
      const dateCheckIn = new Date(departDate);
      const dateCheckOut = new Date(returnDate);
      const numberOfNights = dateCheckOut.getDate() - dateCheckIn.getDate();
      const reservedRooms = [];
      let totalPrice = 0;
      let totalPeopleRoom = 0;
      // tslint:disable-next-line:forin
      for (const roomIndex in selectedRoomsIndexes) {
        reservedRooms.push(roomList[roomIndex]);
        totalPrice += roomList[roomIndex].price * numberOfNights;
        totalPeopleRoom += roomList[roomIndex].maxCapacity;
      }
      if (this.props.nPassengers > totalPeopleRoom) {
        alert('Please select rooms for all the passengers.');
      } else {
        this.props.addSelectedHotel(selectedHotel, reservedRooms, totalPrice);
        this.props.handleClose();
      }
    } else {
      alert('Please select a flight first!');
    }
  };

  onRadioBtnClick = roomIndex => {
    const { selectedRoomsIndexes } = this.state;
    const newValue = selectedRoomsIndexes[roomIndex] ? false : true;
    const newSelectedRooms = Object.assign({}, selectedRoomsIndexes);
    newSelectedRooms[roomIndex] = newValue;
    this.setState({
      selectedRoomsIndexes: newSelectedRooms
    });
  };

  renderRoomList = () => {
    const { hotelList, roomList, hSelected, departDate, returnDate } = this.props;
    const { selectedRoomsIndexes } = this.state;
    if (hSelected !== -1) {
      const currentHotel = hotelList[hSelected];
      const dateCheckIn = new Date(departDate);
      const dateCheckOut = new Date(returnDate);
      const numberOfNights = dateCheckOut.getDate() - dateCheckIn.getDate();
      const list = [];
      const items = [];
      // Loop to create children
      items.push(
        <Row>
          <Col>Room Capacity</Col>
          <Col>Room Type</Col>
          <Col>Room Price for {numberOfNights} nights</Col>
        </Row>
      );
      items.push(<br />);
      for (let j = 0; j < roomList.length; j++) {
        if (roomList[j].hotel.id === currentHotel.id) {
          const onRadioBtnClick = this.onRadioBtnClick.bind(this, j);
          items.push(
            <ListGroupItem className="list-item" outline onClick={onRadioBtnClick} active={selectedRoomsIndexes[j] === true}>
              <Row>
                <Col>{roomList[j].maxCapacity}</Col>
                <Col>{roomList[j].roomType}</Col>
                <Col>{roomList[j].price * numberOfNights}</Col>
              </Row>
            </ListGroupItem>
          );
        }
      }
      // Create the parent and add the children
      list.push(<ListGroup>{items}</ListGroup>);
      return list;
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.showRoomSelection}
        toggle={this.props.handleClose}
        backdrop="static"
        id="room-selection-page"
        autoFocus={false}
      >
        <ModalHeader toggle={this.props.handleClose}>Select Rooms</ModalHeader>
        <ModalBody>
          <div className="RoomList">{this.renderRoomList()}</div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.handleAddHotel}>Add Rooms</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = storeState => ({
  hotelList: storeState.hotel.entities,
  roomList: storeState.hotelRoom.entities,
  hSelected: storeState.reservations.hSelected,
  nPassengers: storeState.home.nPassengers,
  departDate: storeState.home.departDate,
  returnDate: storeState.home.returnDate
});

const mapDispatchToProps = { addSelectedHotel, getEntities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomSelectionPage);

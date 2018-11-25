import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupAddon,
  Input
} from 'reactstrap';

import { updateHSelected } from './planner.reducer';
import { getEntitiesByCity } from '../../entities/hotel/hotel.reducer';
import { getEntities as getRooms } from '../../entities/hotel-room/hotel-room.reducer';

export interface IHotelListProps extends StateProps, DispatchProps {
  handleOpenRoomSelection: Function;
}

export class HotelList extends React.Component<IHotelListProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEntitiesByCity(this.props.destination);
    this.props.getRooms();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.destination !== this.props.destination) {
      this.props.getEntitiesByCity(nextProps.destination);
    }
  }

  onRadioBtnClick = hSelected => {
    this.props.updateHSelected(hSelected);
  };

  calculateLowestRoomPrices = () => {
    const { hotelList, roomList } = this.props;
    const minPrices = [];
    for (const hotel of hotelList) {
      let minPrice = -1;
      for (const room of roomList) {
        if (room.hotel.id === hotel.id && (minPrice === -1 || room.price < minPrice)) {
          minPrice = room.price;
        }
      }
      minPrices.push(minPrice);
    }
    return minPrices;
  };

  createHotelList = () => {
    const { hotelList } = this.props;
    const list = [];
    const items = [];
    // Loop to create children
    items.push(
      <Row>
        <Col>Hotel Name</Col>
        <Col>Address</Col>
        <Col>Room prices starting at</Col>
      </Row>
    );
    items.push(<br />);
    const minPrices = this.calculateLowestRoomPrices();
    for (let j = 0; j < hotelList.length; j++) {
      const onRadioBtnClick = this.onRadioBtnClick.bind(this, j);
      items.push(
        <ListGroupItem className="list-item" outline onClick={onRadioBtnClick} active={this.props.hSelected === j}>
          <Row>
            <Col>{hotelList[j].name}</Col>
            <Col>
              <Row>
                <Col>{hotelList[j].city}</Col>
              </Row>
              <Row>
                <Col>{hotelList[j].address}</Col>
              </Row>
            </Col>
            <Col>{minPrices[j]} per night</Col>
          </Row>
        </ListGroupItem>
      );
    }
    // Create the parent and add the children
    list.push(<ListGroup>{items}</ListGroup>);
    return list;
  };

  handleChooseRoom = () => {
    if (this.props.hSelected !== -1) {
      this.props.handleOpenRoomSelection();
    } else {
      alert('Please select a hotel first!');
    }
  };

  render() {
    return (
      <Card>
        <CardBody>
          <Row>
            <Col sm="6">
              <InputGroup>
                <InputGroupAddon addonType="prepend">Max Price</InputGroupAddon>
                <Input name="maxPrice" id="maxPrice" placeholder="-" />
              </InputGroup>
            </Col>
            <Col sm="6">
              <InputGroup>
                <InputGroupAddon addonType="prepend">Room Type</InputGroupAddon>
                <Input name="roomType" id="roomType" placeholder="-" />
              </InputGroup>
            </Col>
          </Row>
        </CardBody>
        <CardBody>
          <Row>
            <Col>{this.createHotelList()}</Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Button onClick={this.handleChooseRoom}>Select Room</Button>
        </CardFooter>
      </Card>
    );
  }
}

const mapStateToProps = storeState => ({
  destination: storeState.home.destination,
  departDate: storeState.home.departDate,
  returnDate: storeState.home.returnDate,
  nPassengers: storeState.home.nPassengers,
  hotelList: storeState.hotel.entities,
  roomList: storeState.hotelRoom.entities,
  hSelected: storeState.reservations.hSelected
});

const mapDispatchToProps = {
  updateHSelected,
  getEntitiesByCity,
  getRooms
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelList);

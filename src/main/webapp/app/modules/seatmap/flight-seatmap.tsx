import './flight-seatmap.scss';

import React from 'react';
import { connect } from 'react-redux';
import Seat from './seat';
import Blank from './blank';
import { Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { addSelectedFlight } from '../planner/planner.reducer';
import { getEntities } from '../../entities/seat/seat.reducer';

const seatWidth = 35;

export interface ISeatmapProps extends StateProps, DispatchProps {
  showSeatmap: boolean;
  handleClose: Function;
}

export class FlightSeatmapPage extends React.Component<ISeatmapProps> {
  state = {
    selectedSeats: {},
    flightSeats: [],
    sizeEconomic: 0,
    sizeExecutive: 0,
    seatmapRows: [],
    width: 0
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEntities();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showSeatmap === false && this.props.showSeatmap === true) {
      this.setState({
        selectedSeats: {},
        sizeEconomic: 0,
        sizeExecutive: 0,
        seatmapRows: [],
        width: 0
      });
      if (this.props.rSelected !== -1) {
        this.filterSeats();
      }
    }
  }

  filterSeats() {
    const { seatList, rSelected, flightList } = this.props;
    const selectedFlight = flightList[rSelected];
    const flightID = selectedFlight.id;
    const filteredSeats = [];
    for (const seat of seatList) {
      if (seat.flight.id === flightID) {
        filteredSeats.push(seat);
      }
    }
    filteredSeats.sort(function sortByRow(a, b) {
      if (a.row > b.row) {
        return 1;
      }
      if (a.row < b.row) {
        return -1;
      }
      if (a.row === b.row) {
        if (a.number > b.number) {
          return 1;
        }
        if (a.number < b.number) {
          return -1;
        }
      }
      return 0;
    });
    const rows = [];
    let currentRowNumber = '';
    let currentRow = [];
    let currentSeat = {};
    for (const seat of filteredSeats) {
      currentSeat = {};
      if (currentRowNumber === '') {
        currentRowNumber = seat.row;
      }
      if (seat.row !== currentRowNumber) {
        rows.push(currentRow);
        currentRow = [];
        currentRowNumber = seat.row;
      }
      if (String(seat.number) === '4') {
        currentRow.push(null);
      }
      currentSeat['number'] = seat.number;
      if (seat.isReserved) {
        currentSeat['isReserved'] = true;
      }
      if (seat.isExecutive) {
        currentSeat['isExecutive'] = true;
      }
      currentRow.push(currentSeat);
    }
    rows.push(currentRow);
    this.setState({
      seatmapRows: rows,
      width: seatWidth * (1 + Math.max.apply(null, rows.map(row => row.length))),
      flightSeats: filteredSeats
    });
  }

  selectSeat = (row, number, isExecutive) => {
    const { selectedSeats, sizeEconomic, sizeExecutive } = this.state;
    const { nPassengersExecutive, nPassengersEconomic } = this.props;
    const seatAlreadySelected = selectedSeats[row] ? (selectedSeats[row][number] ? true : false) : false;
    const newSelectedSeats = Object.assign({}, selectedSeats);
    if (isExecutive) {
      if (sizeExecutive < nPassengersExecutive && !seatAlreadySelected) {
        if (newSelectedSeats[row]) {
          newSelectedSeats[row][number] = true;
        } else {
          newSelectedSeats[row] = {};
          newSelectedSeats[row][number] = true;
        }
        this.setState({
          selectedSeats: newSelectedSeats,
          sizeExecutive: sizeExecutive + 1
        });
      } else if (seatAlreadySelected) {
        delete newSelectedSeats[row][number];
        this.setState({
          selectedSeats: newSelectedSeats,
          sizeExecutive: sizeExecutive - 1
        });
      }
    } else {
      if (sizeEconomic < nPassengersEconomic && !seatAlreadySelected) {
        if (newSelectedSeats[row]) {
          newSelectedSeats[row][number] = true;
        } else {
          newSelectedSeats[row] = {};
          newSelectedSeats[row][number] = true;
        }
        this.setState({
          selectedSeats: newSelectedSeats,
          sizeEconomic: sizeEconomic + 1
        });
      } else if (seatAlreadySelected) {
        delete newSelectedSeats[row][number];
        this.setState({
          selectedSeats: newSelectedSeats,
          sizeEconomic: sizeEconomic - 1
        });
      }
    }
  };

  /*     renderRows1() {
        const { selectedSeats: seats } = this.state;
        const { alpha } = this.props;
        return this.props.rows.map((row, index) => {
            const rowNumber = alpha ?
                String.fromCharCode('A'.charCodeAt(0) + index) :
                (index + 1).toString();
            const isSelected = !seats.get(rowNumber, Set()).isEmpty();
            const props = {
                rowNumber,
                isSelected,
                selectedSeat: null,
                seats: row,
                key: `Row${rowNumber}`,
                selectSeat: this.selectSeat
            };

            return (
                <Row  {...props}>
                    {this.renderSeats(row, rowNumber, isSelected)}
                </Row>
            );
        });
    };

    renderSeats1(seats, rowNumber, isRowSelected) {
        const { selectedSeats, size } = this.state;
        const { maxReservableSeats } = this.props;
        return seats.map((seat, index) => {
            if (seat === null) return <Blank key={index}/>;
            const isSelected = isRowSelected && selectedSeats.get(rowNumber).includes(seat.number);
            const props = {
                isSelected,
                isReserved: seat.isReserved,
                isEnabled: size < maxReservableSeats,
                selectSeat: this.selectSeat.bind(this, rowNumber, seat.number),
                seatNumber: seat.number,
                key: index
            };
            return <Seat {...props} />;
        });
    } */

  renderRows = () => {
    const renderedRows = [];
    const { seatmapRows } = this.state;
    for (let i = 0; i < seatmapRows.length; i++) {
      if (seatmapRows[i]) {
        const rowLetter = String.fromCharCode('A'.charCodeAt(0) + i);
        renderedRows.push(this.renderSeats(seatmapRows[i], rowLetter));
      }
    }
    const renderedSeatmap = [];
    renderedSeatmap.push(<Row>{renderedRows}</Row>);
    return renderedRows;
  };

  renderSeats(row, rowLetter) {
    const { selectedSeats } = this.state;
    const renderedSeats = [];
    renderedSeats.push(<div className="RowNumber">{rowLetter}</div>);
    renderedSeats.push(<div className="PlaneBorder" />);
    for (const seat of row) {
      if (seat) {
        const seat_number = Number(seat['number']);
        const isExecutive = Boolean(seat['isExecutive']);
        const isReserved = Boolean(seat['isReserved']);
        const isSelected = selectedSeats[rowLetter] ? (selectedSeats[rowLetter][seat_number] ? true : false) : false;
        const selectSeat = this.selectSeat.bind(this, rowLetter, seat_number, isExecutive);
        renderedSeats.push(
          <Seat
            isExecutive={isExecutive}
            isSelected={isSelected}
            isEnabled={true}
            isReserved={isReserved}
            seatNumber={seat_number}
            selectSeat={selectSeat}
          />
        );
      } else {
        renderedSeats.push(<Blank />);
      }
    }
    renderedSeats.push(<div className="PlaneBorder" />);
    const renderedRow = [];
    renderedRow.push(<Row>{renderedSeats}</Row>);
    return renderedRow;
  }

  calculateTotalPrice = flight => {
    const { nPassengersEconomic, nPassengersExecutive } = this.props;
    const basePrice = flight.price;
    const totalPrice = Number(nPassengersEconomic) * Number(basePrice) + 2 * basePrice * Number(nPassengersExecutive);
    return totalPrice;
  };

  handleAddFlight = () => {
    // Also check for number of seats
    const { rSelected, flightList, nPassengersExecutive, nPassengersEconomic } = this.props;
    const { selectedSeats, flightSeats } = this.state;
    if (rSelected !== -1) {
      const selectedFlight = flightList[rSelected];
      const reservedSeats = [];
      // tslint:disable-next-line:forin
      for (const rowLetter in selectedSeats) {
        // tslint:disable-next-line:forin
        for (const rowNumber in selectedSeats[rowLetter]) {
          for (const seat of flightSeats) {
            if (seat.row === rowLetter && seat.number === rowNumber) {
              reservedSeats.push(seat);
            }
          }
        }
      }
      const totalNumberPassengers = Number(nPassengersEconomic) + Number(nPassengersExecutive);
      const totalPrice = this.calculateTotalPrice(selectedFlight);
      console.log(totalNumberPassengers, reservedSeats);
      if (reservedSeats.length !== totalNumberPassengers) {
        alert('Please select seats for all the passengers.');
      } else {
        this.props.addSelectedFlight(selectedFlight, reservedSeats, totalPrice);
        this.props.handleClose();
      }
    } else {
      alert('Please select a flight first!');
    }
  };

  render() {
    return (
      <Modal isOpen={this.props.showSeatmap} toggle={this.props.handleClose} backdrop="static" id="seatmap-page" autoFocus={false}>
        <ModalHeader toggle={this.props.handleClose}>Select Seats</ModalHeader>
        <ModalBody>
          <div className="Seatmap">
            <div className="FrontBackText">Main Cabin</div>
            <div style={{ display: 'inline-block' }}>{this.renderRows()}</div>
            <div className="FrontBackText">Back of plane</div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.handleAddFlight}>Add flight</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = storeState => ({
  nPassengersEconomic: storeState.reservations.nPassengersEconomic,
  nPassengersExecutive: storeState.reservations.nPassengersExecutive,
  rSelected: storeState.reservations.rSelected,
  flightList: storeState.flight.entities,
  seatList: storeState.seat.entities
});

const mapDispatchToProps = { addSelectedFlight, getEntities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightSeatmapPage);

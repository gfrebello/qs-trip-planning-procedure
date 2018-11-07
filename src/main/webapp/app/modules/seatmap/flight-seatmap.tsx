import './flight-seatmap.scss';

import React from 'react';
import { connect } from 'react-redux';
import Seat from './seat';
import Blank from './blank';
import { Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { addSelectedFlight } from '../planner/planner.reducer';

const seatWidth = 35;
const rows_example = [
  [
    { number: 1, isExecutive: true },
    { number: 2, isExecutive: true },
    { number: '3', isReserved: true, isExecutive: true },
    null,
    { number: '4', isExecutive: true },
    { number: 5, isExecutive: true },
    { number: 6, isExecutive: true }
  ],
  [
    { number: 1, isReserved: true },
    { number: 2, isReserved: true },
    { number: '3', isReserved: true },
    null,
    { number: '4' },
    { number: 5 },
    { number: 6 }
  ],
  [{ number: 1 }, { number: 2 }, { number: 3, isReserved: true }, null, { number: '4' }, { number: 5 }, { number: 6 }],
  [{ number: 1 }, { number: 2 }, { number: 3 }, null, { number: '4' }, { number: 5 }, { number: 6 }],
  [
    { number: 1, isReserved: true },
    { number: 2 },
    { number: '3', isReserved: true },
    null,
    { number: '4' },
    { number: 5 },
    { number: 6, isReserved: true }
  ]
];

export interface ISeatmapProps extends StateProps, DispatchProps {
  showSeatmap: boolean;
  handleClose: Function;
}

export class FlightSeatmapPage extends React.Component<ISeatmapProps> {
  state = {
    selectedSeats: {},
    sizeEconomic: 0,
    sizeExecutive: 0,
    width: seatWidth * (1 + Math.max.apply(null, rows_example.map(row => row.length)))
  };

  constructor(props) {
    super(props);
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
    for (let i = 0; i < rows_example.length; i++) {
      if (rows_example[i]) {
        const rowLetter = String.fromCharCode('A'.charCodeAt(0) + i);
        renderedRows.push(this.renderSeats(rows_example[i], rowLetter));
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

  handleAddFlight = () => {
    // Also check for number of seats
    if (this.props.rSelected !== -1) {
      this.props.addSelectedFlight(this.props.rSelected);
      this.props.handleClose();
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
  rSelected: storeState.reservations.rSelected
});

const mapDispatchToProps = { addSelectedFlight };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightSeatmapPage);

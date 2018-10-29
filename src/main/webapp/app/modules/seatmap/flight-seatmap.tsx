import './flight-seatmap.scss';

import React from 'react';
import { connect } from 'react-redux';
import Seat from './seat';
import Blank from './blank';
import { Row } from 'reactstrap';

const seatWidth = 35;
const rows_example = [
  [{ number: 1 }, { number: 2 }, { number: '3', isReserved: true }, null, { number: '4' }, { number: 5 }, { number: 6 }],
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

export interface ISeatmapProps extends StateProps, DispatchProps {}

export class FlightSeatmapPage extends React.Component<ISeatmapProps> {
  state = {
    selectedSeats: {},
    size: 0,
    width: seatWidth * (1 + Math.max.apply(null, rows_example.map(row => row.length)))
  };

  constructor(props) {
    super(props);
  }

  /*     selectSeat1 = (row, number) => {
        const { selectedSeats, size } = this.state;
        const { maxReservableSeats, addSeatCallback, removeSeatCallback } = this.props;
        const seatAlreadySelected = selectedSeats.get(row, Set()).includes(number);

        if (size < maxReservableSeats && !seatAlreadySelected) {
            this.setState({
                selectedSeats: selectedSeats.mergeDeep({[row]: Set([number])}),
                size: size + 1
            }, () => addSeatCallback(row, number));
        } else if (selectedSeats.has(row) && seatAlreadySelected) {
            this.setState({
                selectedSeats: selectedSeats.update(row, seats => seats.delete(number)),
                size: size - 1
            }, () => removeSeatCallback(row, number))
        }
    } */

  selectSeat = (row, number) => {
    const { selectedSeats, size } = this.state;
    const seatAlreadySelected = selectedSeats[row] ? (selectedSeats[row][number] ? true : false) : false;
    const newSelectedSeats = Object.assign({}, selectedSeats);
    if (!seatAlreadySelected) {
      if (newSelectedSeats[row]) {
        newSelectedSeats[row][number] = true;
      } else {
        newSelectedSeats[row] = {};
        newSelectedSeats[row][number] = true;
      }
      this.setState({
        selectedSeats: newSelectedSeats,
        size: size + 1
      });
    } else {
      delete newSelectedSeats[row][number];
      this.setState({
        selectedSeats: newSelectedSeats,
        size: size - 1
      });
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
    renderedSeats.push(<div style={{ width: 35 }}>{rowLetter}</div>);
    for (let seat of row) {
      if (seat) {
        const seat_number = Number(seat['number']);
        const isReserved = Boolean(seat['isReserved']);
        const isSelected = selectedSeats[rowLetter] ? (selectedSeats[rowLetter][seat_number] ? true : false) : false;
        console.log(isSelected);
        const selectSeat = this.selectSeat.bind(this, rowLetter, seat_number);
        renderedSeats.push(
          <Seat isSelected={isSelected} isEnabled={true} isReserved={isReserved} seatNumber={seat_number} selectSeat={selectSeat} />
        );
      } else {
        renderedSeats.push(<Blank />);
      }
    }
    const renderedRow = [];
    renderedRow.push(<Row>{renderedSeats}</Row>);
    return renderedRow;
  }

  render() {
    return <div>{this.renderRows()}</div>;
  }
}

const mapStateToProps = storeState => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightSeatmapPage);

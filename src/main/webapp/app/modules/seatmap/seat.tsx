import React from 'react';

export interface ISeatProps {
  isSelected: boolean;
  isEnabled: boolean;
  isReserved: boolean;
  isExecutive: boolean;
  seatNumber: number;
  selectSeat: Function;
}

export default class Seat extends React.Component<ISeatProps> {
  handleClick = () => {
    !this.props.isReserved && this.props.selectSeat();
  };

  render() {
    const { isSelected, isEnabled, isExecutive, isReserved } = this.props;
    let className = 'Seat';
    if (isExecutive) {
      className = className.concat(' Seat--executive');
    }
    if (isSelected) {
      className = className.concat(' Seat--selected');
    }
    if (!isSelected && isEnabled && !isReserved) {
      className = className.concat(' Seat--enabled');
    }
    if (isReserved) {
      className = className.concat(' Seat--reserved');
    }
    return (
      <div className={className} onClick={this.handleClick}>
        <span className="SeatNumber">{this.props.seatNumber}</span>
      </div>
    );
  }
}

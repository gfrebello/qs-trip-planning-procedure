import React from 'react';
import Seat from './seat';
import Blank from './blank';
import RowNumber from './RowNumber';
import cx from 'classnames';

export interface ISeatmapRowProps {
  rowNumber: string;
  isSelected: boolean;
}

export default class SeatmapRow extends React.Component<ISeatmapRowProps> {
  state = {
    over: false
  };
  constructor(props) {
    super(props);
  }

  handleMouseMove = over => {
    this.setState({ over });
  };

  render() {
    const { over } = this.state;
    const { rowNumber, isSelected } = this.props;
    const bold = over || isSelected;
    let className = 'Row';
    if (!isSelected) {
      className.concat(' Row--enabled');
    }
    if (isSelected) {
      className.concat(' Row--selected');
    }
    return (
      <div className={className} onMouseOut={this.handleMouseMove.bind(this, false)} onMouseOver={this.handleMouseMove.bind(this, true)}>
        <RowNumber rowNumber={rowNumber} bold={bold} />
        {this.props.children}
      </div>
    );
  }
}

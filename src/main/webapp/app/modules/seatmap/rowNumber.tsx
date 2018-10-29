import React from 'react';

export interface IRowNumberProps {
  rowNumber: string;
  bold: boolean;
}

export default class RowNumber extends React.Component<IRowNumberProps> {
  render() {
    const styles: React.CSSProperties = { fontWeight: this.props.bold ? 700 : 'normal' };
    return (
      <div style={styles} className="RowNumber">
        {this.props.rowNumber}
      </div>
    );
  }
}

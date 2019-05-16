import React, { Component } from 'react';
import './ResultsList.css';

import { inspect } from 'util';

import ResultItem from '../ResultItem/ResultItem.js'

export default class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortColumn: {
        index: null,
        direction: 'desc'
      }
    }
    this.handleSort = this.handleSort.bind(this);
    this.setSortColumn = this.setSortColumn.bind(this);
    this.sortData = this.sortData.bind(this);
    this.renderSortImage = this.renderSortImage.bind(this);
  }

  handleSort(e) {
    const newIndex = Object.values(e.target)[0].key || Object.values(e.target)[0].return.key;
    this.setSortColumn(newIndex);
  }

  setSortColumn(newIndex) {
    const { index, direction } = this.state.sortColumn;
    let newDirection = direction;
    if (newIndex === index) {
      newDirection = direction === 'desc' ? 'asc' : 'desc';
    }
    this.setState({
      sortColumn: {
        index: newIndex,
        direction: newDirection
      }
    })
  }

  sortData(positions, columns) {
    const { index, direction } = this.state.sortColumn;
    if (index) {
      const sortByProp = Object.values(columns)[index].prop;
      console.log(`sortByProp: ${sortByProp}`);
      const sortFunc = (a, b) => {
        if (a[sortByProp] == b[sortByProp]) return 0;
        return a[sortByProp] > b[sortByProp] ? 1 : -1;
      }
      let sortedPositions = [...positions].sort(sortFunc);
      if (direction == 'asc') {
        sortedPositions.reverse()
      }
      return sortedPositions;
    } else {
        return positions;
    }
  }

  renderSortImage(column, index) {
    if (column.sortable) {
      if (this.state.sortColumn.index == index) {
        if (this.state.sortColumn.direction == 'asc') {
          return (
            <img className="up-arrow" />
          );
        } else {
          return (
            <img className="down-arrow" />
          );
        }
      }
      return (
        <img className="placeholder" />
      );
    } else {
      return (
        <img className="x" />
      );
    }
  }

  snideRemark(columnName) {
    alert(`Sorry, Kevin says you can't sort by ${columnName} 😝`);
  }

  render() {
    const columns = this.props.columns;
    const positions = this.sortData(this.props.positions, columns);
    return (
      <div className="ResultsList">
        <table>
          <thead>
            <tr>
              {
                columns.map((column, index) => {
                  return (
                    <th
                      key={index}
                      onClick={column.sortable ? this.handleSort : () => this.snideRemark(column.name) }
                    >
                      {column.name}
                      {this.renderSortImage(column, index)}
                    </th>
                  );
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              positions.map((position, index) => {
              return (
                <ResultItem columns={columns} position={position} index={index} />
              )
            })
            }
          </tbody>
        </table>
      </div>
    );
  }
};

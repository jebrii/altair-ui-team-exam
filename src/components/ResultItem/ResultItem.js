import React from 'react';
import './ResultItem.css';

export default function ResultItem({columns, position, index}) {
  const propsFromColumns = columns.map(column => column.prop);
  return (
    <tr key={index}>
      <td>{position[propsFromColumns[0]]}</td>
      <td>{position[propsFromColumns[1]]}</td>
      <td>{position[propsFromColumns[2]]}</td>
      <td>{position[propsFromColumns[3]]}</td>
      <td>{position[propsFromColumns[4]]}</td>
    </tr>
  );
};

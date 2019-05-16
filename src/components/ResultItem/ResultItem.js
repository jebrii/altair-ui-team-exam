import React from 'react';
import './ResultItem.css';

export default function ResultItem({columns, position, index}) {
  return (
    <tr key={index}>
      {
        columns.map(({ prop }) => {
          return (
            <td>{position[prop]}</td>
          );
        })
      }
    </tr>
  );
};

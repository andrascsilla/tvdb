import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
// import styled from 'styled-components';

function TableComponent({ header, rows = [], children, onClick = () => {}, ...props }) {
  return (
    <Table striped>
      <thead>
        <tr>
          {header.map(head => (
            <th key={head.id}>{head.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.id} onClick={onClick}>
            <td>{row.name}</td>
            <td>{row.image}</td>
            <td>{row.firstAired}</td>
            <td>{row.network}</td>
            <td>{row.overview}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

TableComponent.propTypes = {
  header: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.node.isRequired,
    })
  ),
  rows: PropTypes.arrayOf(PropTypes.any),
  onClick: PropTypes.func,
};

export default TableComponent;

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
// import styled from 'styled-components';

function TableComponent({ header, children, onClick = () => {}, ...props }) {
  return (
    <Table striped>
      <thead>
        <tr>
          {header.map(head => (
            <th key={head.id}>{head.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
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
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default TableComponent;

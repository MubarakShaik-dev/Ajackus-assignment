import React from 'react';
import { ControlsContainer, SearchInput, ActionButton, Select } from './styles';

const Controls = ({ searchTerm, onSearchChange, onAdd, onFilter, usersPerPage, onUsersPerPageChange }) => {
  return (
    <ControlsContainer>
      <SearchInput
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={onSearchChange}
      />
      <div>
        <Select value={usersPerPage} onChange={onUsersPerPageChange}>
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
          <option value="100">100 per page</option>
        </Select>
        <ActionButton onClick={onFilter}>Filter</ActionButton>
        <ActionButton onClick={onAdd} primary>+ Add User</ActionButton>
      </div>
    </ControlsContainer>
  );
};

export default Controls;
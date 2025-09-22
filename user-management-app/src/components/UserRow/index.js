import React from 'react';
import { StyledTr, StyledTd, ActionButton } from './styles';

const UserRow = ({ user, onEdit, onDelete }) => {
  return (
    <StyledTr>
      <StyledTd data-label="ID">{user.id}</StyledTd>
      <StyledTd data-label="First Name">{user.firstName}</StyledTd>
      <StyledTd data-label="Last Name">{user.lastName}</StyledTd>
      <StyledTd data-label="Email">{user.email}</StyledTd>
      <StyledTd data-label="Department">{user.department}</StyledTd>
      <StyledTd data-label="Actions">
        <ActionButton onClick={() => onEdit(user)} edit>Edit</ActionButton>
        <ActionButton onClick={() => onDelete(user.id)} delete>Delete</ActionButton>
      </StyledTd>
    </StyledTr>
  );
};

export default UserRow;
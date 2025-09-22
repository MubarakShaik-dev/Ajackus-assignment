import React from 'react';
import UserRow from '../UserRow';
import { StyledTable, StyledThead, StyledTh, StyledTr, StyledTbody } from './styles';

const UserTable = ({ users, onSort, sortConfig, onEdit, onDelete }) => {
    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) return '';
        return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <StyledTable>
                <StyledThead>
                    <StyledTr>
                        <StyledTh onClick={() => onSort('id')}>ID{getSortIndicator('id')}</StyledTh>
                        <StyledTh onClick={() => onSort('firstName')}>First Name{getSortIndicator('firstName')}</StyledTh>
                        <StyledTh onClick={() => onSort('lastName')}>Last Name{getSortIndicator('lastName')}</StyledTh>
                        <StyledTh onClick={() => onSort('email')}>Email{getSortIndicator('email')}</StyledTh>
                        <StyledTh onClick={() => onSort('department')}>Department{getSortIndicator('department')}</StyledTh>
                        <StyledTh>Actions</StyledTh>
                    </StyledTr>
                </StyledThead>
                <StyledTbody>
                    {users.map(user => (
                        <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </StyledTbody>
            </StyledTable>
        </div>
    );
};

export default UserTable;
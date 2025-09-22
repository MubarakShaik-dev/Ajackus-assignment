import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const StyledThead = styled.thead`
  background-color: #f2f2f2;
`;

export const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const StyledTh = styled.th`
  padding: 12px;
  text-align: left;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #e9e9e9;
  }
`;

export const StyledTbody = styled.tbody``;
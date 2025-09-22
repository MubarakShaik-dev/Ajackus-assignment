import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const PageButton = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: ${props => props.active ? '#0275d8' : 'white'};
  color: ${props => props.active ? 'white' : '#0275d8'};
  cursor: pointer;
  border-radius: 4px;
  
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;
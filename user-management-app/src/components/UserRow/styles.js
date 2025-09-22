import styled from 'styled-components';

export const StyledTr = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const StyledTd = styled.td`
  padding: 12px;
  
  @media (max-width: 768px) {
    display: block;
    text-align: right;
    padding-left: 50%;
    position: relative;
    
    &:before {
      content: attr(data-label);
      position: absolute;
      left: 10px;
      width: calc(50% - 20px);
      text-align: left;
      font-weight: bold;
    }
  }
`;

export const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  margin-right: 5px;
  background-color: ${props => props.edit ? '#f0ad4e' : '#d9534f'};
  
  &:hover {
    opacity: 0.8;
  }
`;
import styled from 'styled-components';

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

export const SearchInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ActionButton = styled.button`
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  /* This line is changed */
  background-color: ${props => props.primary ? '#0275d8' : '#5bc0de'}; 
  /* The color is also changed for better contrast */
  color: white; 
  cursor: pointer;
  margin-left: 10px;
  font-weight: bold;
  
  &:hover {
    opacity: 0.9;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;
import styled from 'styled-components';

export const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #555;
`;

export const ErrorText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #d9534f;
  background-color: #f2dede;
  border: 1px solid #ebccd1;
  padding: 15px;
  border-radius: 4px;
`;
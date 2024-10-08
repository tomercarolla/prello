import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => props.$flexDirection || 'row'};
  justify-content: ${(props) => props.$justifyContent || 'space-between'};
  align-items: ${(props) => props.$alignItems || 'center'};
  width: 100%;
  padding: 5px;
`;

export const Divider = styled.div`
  border-top: 1px solid #999;
  opacity: 0.2;
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => props.$flexDirection || 'row'};
  justify-content: ${(props) => props.$justifyContent || 'space-between'};
  align-items: ${(props) => props.$alignItems || 'center'};
  width: 100%;
  padding-block: 12px;
  padding-inline: 8px;
`;

export const AvatarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Divider = styled.div`
  border-top: 1px solid var(--dynamic-text-transparent2);
`;

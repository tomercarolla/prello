import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => props.$flexDirection || 'row'};
  justify-content: ${(props) => props.$justifyContent || 'space-between'};
  align-items: ${(props) => props.$alignItems || 'center'};
  width: 100%;
  padding: 8px 4px 8px;
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    color: var(--ds-text-inverse);
  }
`;

export const Divider = styled.div`
  border-top: 1px solid var(--dynamic-text-transparent2);
`;

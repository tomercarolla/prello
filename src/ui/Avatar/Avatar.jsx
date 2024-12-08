import { utilService } from 'services/util.service';
import styled from 'styled-components';

export function Avatar({ data, size = '30px', fontSize = '14px' }) {
  const name = data?.fullname || data?.username || '';
  const imageUrl = data?.imgUrl;

  function getUserInitials(name) {
    return name ? name.charAt(0).toUpperCase() : '';
  }

  const initials = getUserInitials(name);
  const bgColor = utilService.getColorByUsername(name);

  return (
    <AvatarWrapper
      $size={size}
      $fontSize={fontSize}
      $bgColor={bgColor}
      title={name || 'User'}
      role="img"
      aria-label={name || 'User avatar'}
    >
      {imageUrl ? <img src={imageUrl} alt={'name'} /> : <span>{initials}</span>}
    </AvatarWrapper>
  );
}

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  background-color: ${({ $bgColor }) => $bgColor};
  color: white;
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

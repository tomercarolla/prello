import styled from 'styled-components';

function getUserInitials(name) {
  if (!name) return '';

  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({
  data,
  size = '24px',
  fontSize = '12px',
  bgColor = 'gray',
}) {
  const name = data?.fullname || data?.username || '';
  const imageUrl = data?.imgUrl || data?.avatarUrl || '';

  const initials = getUserInitials(name);

  return (
    <AvatarWrapper
      $imageUrl={imageUrl}
      $size={size}
      $fontSize={fontSize}
      $bgColor={bgColor}
      title={name || 'User'}
      role="img"
      aria-label={name || 'User avatar'}
    >
      {imageUrl ? <img src={imageUrl} alt={name || 'User avatar'} /> : initials}
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

import styled from 'styled-components';

function getUserInitials(name) {
  if (!name) return;
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({ data, size, fontSize }) {
  // Handle different data structures for user and member
  const name = data?.fullname || data?.username || '';
  const imageUrl = data?.imgUrl || data?.avatarUrl || '';

  const initials = getUserInitials(name);

  return (
    <AvatarWrapper
      $imageUrl={imageUrl}
      size={size}
      fontSize={fontSize}
      title={name || 'User'}
      role="img"
      aria-label={name || 'User avatar'}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name || 'User avatar'}  />
      ) : initials}
    </AvatarWrapper>
  );
}

  const AvatarWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ size }) => size || '24px'};
    height: ${({ size }) => size || '24px'};
    border-radius: 50%;
    background-color: ${({ $bgColor }) => $bgColor || 'gray'};
    color: white;
    font-size: ${({ fontSize }) => fontSize || '12px'};
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    background-image: ${({ $imageUrl }) =>
      $imageUrl ? `url(${$imageUrl})` : 'none'};
    background-size: cover;
    background-position: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
  `;
import styled from 'styled-components';
import {icons} from "./svg-icons/icons.jsx";

const StyledIcon = styled.i`
    height: ${({size}) => size || '24px'};
    min-width: ${({size}) => size || '24px'};
    aspect-ratio: 1;
    color: ${({color}) => color || 'currentColor'};

    svg {
        width: 100%;
        height: 100%;
    }
`;

export function Icon({ name, size = '24px', ...props }) {
    const IconComponent = icons[name];

    if (!IconComponent) {
        console.error(`Icon "${name}" not found.`);
        return null;
    }

    return (
        <StyledIcon size={size} {...props}>
            <IconComponent />
        </StyledIcon>
    );
};
import styled from 'styled-components';
import { icons } from './svg-icons/icons.js';

const StyledIcon = styled.div`
    width: ${({width}) => width || '24px'};
    height: ${({height}) => height || '24px'};
    color: ${({color}) => color || 'currentColor'};

    svg {
        width: 100%;
        height: 100%;
    }
`;

export const Icon = ({ name, width = '24px', height = '24px', ...props }) => {
    const IconComponent = icons[name];

    if (!IconComponent) {
        console.error(`Icon "${name}" not found.`);
        return null;
    }

    return (
        <StyledIcon width={width} height={height} {...props}>
            <IconComponent />
        </StyledIcon>
    );
};
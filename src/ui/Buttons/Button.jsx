import styled from "styled-components";

export const Button = styled.button`
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    padding-inline: 6px;
    transition-property: background-color, border-color, box-shadow;
    transition-duration: 85ms;
    transition-timing-function: ease;
    max-width: 400px;
    font-size: 14px;
    font-weight: 500;
    background-color: var(--fill, var(--ds-background-brand-bold));
    color: var(--text, var(--ds-text-inverse));
    border-radius: ${({radius}) => radius || '0'};

    height: ${({size}) => {
        switch (size) {
            case 'sm':
                return '24px';
            case 'md':
                return '28px';
            case 'lg':
                return '32px';
            default:
                return '32px'
        }
    }};

    --fill: ${({scale}) => {
        switch (scale) {
            case 'brand':
                return 'var(--ds-background-brand-bold)';
            case 'white':
                return 'var(--dynamic-button-highlighted)';
            case 'neutral':
                return 'var(--ds-background-neutral)';
            case 'ghost':
            case 'dynamic':
                return 'transparent';
        }
    }};

    --text: ${({scale}) => {
        switch (scale) {
            case 'brand':
                return 'var(--ds-text-inverse)';
            case 'white':
                return 'var(--dynamic-button-highlighted-text)';
            case 'neutral':
                return 'var(--ds-background-neutral)';
            case 'ghost':
                return 'var(--ds-text-subtle)';
            case 'dynamic':
                return 'var(--dynamic-text)';
        }
    }};

    width: ${({fullwidth, as}) => fullwidth && as !== 'a' ? '100%' : 'fit-content'};

    &:hover {
        text-decoration: none;
        
        --fill: ${({scale}) => {
            switch (scale) {
                case 'brand':
                    return 'var(--ds-background-brand-bold-hovered)';
                case 'white':
                    return 'var(--dynamic-button-highlighted-hovered)';
                case 'neutral':
                    return 'var(--ds-background-neutral-hovered)';
                case 'ghost':
                    return 'var(--ds-background-neutral-hovered)';
                case 'dynamic':
                    return 'var(--dynamic-button-hovered)'
            }
        }};
    }

    &:has(> i:only-child) {
        justify-content: center;
        aspect-ratio: 1/1;
        padding-inline: 0;
    }

    i {
        display: flex;
    }
`;
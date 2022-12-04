import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../theme';
import Icon from '../Icon';
import OutsideAlerter from '../OutsideAlerter';
import DropDown from '../Dropdown';

const ButtonContainer = styled.button`
    cursor: pointer;
    outline: none !important;
    &:focus {
        outline: ${({popout}) => (popout ? 'none' : 'inherit')};
    }
    background: ${({background, colors}) => background ? background : colors ? colors?.background : theme.background};
    &:hover {
        background: ${({colors}) => colors ? colors.hover : theme.background2};
        color: ${({colors}) => colors ? colors.hoverText : theme.text2};
    }
    border: ${props => (props.noBorder ? '0' : `2px solid ${props.theme.border}`)};
    color: ${({colors}) => colors ? colors.text : theme.text};
    box-sizing: border-box;
    border-radius: ${({oval}) => oval ? '25px' : '4px'};
    padding: ${props => (props.small ? '7px' : '15px')} ${props => (props.popout ? '12px' : '15px')}
        ${props => (props.small ? '7px' : '15px')} ${props => (props.popout ? '4px' : '15px')};
    font-family: arial;
    text-transform: ${props => (props.noUppercase ? 'capitalize' : 'uppercase')};
    width: ${props => (props.block ? '100%' : 'auto')};
    min-width: ${({popout}) => (popout ? '200px' : 'auto')};
    display: ${props => (props.block ? 'flex' : 'inline-flex')};
    flex-direction: ${props => (props.iconRight ? 'row-reverse' : 'row')};
    align-items: center;
    gap: ${props => (props.$condensed ? '0' : '10px')};
    font-size: ${(props) => props.fontSize ? props.fontSize : props.theme.fontSizeXS};
    font-weight: bold;
    letter-spacing: 0.031rem;
    justify-content: center;
    white-space: nowrap;
    margin: ${props => props.margin};
    ${props =>
        props.popout &&
        `
        position: relative;
        height: 42px;`}
    &:disabled {
        cursor: default;
        opacity: 0.5;
    }
    @media (max-width: 768px) {
        font-size: ${props => props.theme.fontSizeXXS};
    }
`;
const blinking = () => {
    return keyframes`
        50% {
            opacity: 0;
        }
    `;
};

const IndicatorLight = styled(Icon)`
    height: 16px;
    width: 16px;
    border-radius: 100%;
    background-color: #fafa69;
    animation: ${blinking} 1s linear infinite;
`;

const ButtonIconContainer = styled.div`
    display: inline-block;
    ${props =>
        props.popout &&
        `
        margin-left: 15px;`}
    svg {
        width: 15px;
        height: 15px;
        margin: -2px 0;
        path {
            fill: ${props => props.colors.text};
        }
    }
`;

const ButtonIcon = styled(Icon)`
    position: ${props => (props.popout ? 'absolute' : 'relative')};
    right: ${props => (props.popout ? '11px' : 'auto')};
    bottom: ${props => (props.popout ? '13px' : 'auto')};
`;

const ButtonContent = styled.div`
    display: inline-block;
`;

const Separator = styled.div`
    height: 42px;
    width: 2px;
    background-color: white;
    position: absolute;
    right: 40px;
    bottom: -2px;
`;

const typeColors = {
    default: {
        text: '#fff',
        background: theme.primary,
        border: theme.primary,
    },
    green: {
        text: '#333',
        background: '#8EDE64;',
        border: 'none',
        hover: '#37DEC5',
        hoverText: '#fff'
    },
    outline: {
        text: theme.primary,
        background: '#fff',
        border: theme.primary,
    },
    outlineInverse: {
        text: '#fff',
        background: theme.primary,
        border: '#fff',
    },
    inverse: {
        text: theme.primary,
        background: '#fff',
        border: '#fff',
    },
    soft: {
        text: theme.primary,
        background: theme.accent3,
        border: theme.accent3,
    },
    table: {
        text: theme.secondary,
        border: theme.border,
        background: '#fff',
    },
};

/**
 * Button Component.
 */
const Button = ({
    className,
    isAnimated,
    block,
    type,
    onClick,
    disabled,
    small,
    children,
    icon,
    condensed,
    iconRight,
    popout,
    separateRightIcon,
    margin,
    noBorder,
    noUppercase,
    fontSize,
    popoutWidth,
    oval,
    ...rest
}) => {
    const colors = typeColors[type] ? typeColors[type] : typeColors.default;
    const [popoutOpen, setPopoutOpen] = useState(false);
    const onClickOutside = () => setPopoutOpen(false);
    const handleClick = () => {
        if (!popout) {
            onClick();
        } else {
            setPopoutOpen(!popoutOpen);
        }
    };

    const content = (
        <ButtonContainer
            className={className}
            isAnimated={isAnimated}
            data-testid="button-container"
            type="button"
            block={block}
            disabled={disabled}
            iconRight={iconRight}
            onClick={handleClick}
            small={small}
            fontSize={fontSize}
            colors={colors}
            $condensed={condensed}
            popout={popout}
            margin={margin}
            noBorder={noBorder}
            noUppercase={noUppercase}
            oval={oval}
            {...rest}>
            {icon && (
                <ButtonIconContainer colors={colors} popout={popout}>
                    {separateRightIcon && <Separator />}
                    {isAnimated ? (
                        <IndicatorLight name="circle" />
                    ) : (
                        <ButtonIcon data-testid="button-icon" name={icon} popout={popout} />
                    )}
                </ButtonIconContainer>
            )}
            <ButtonContent>{!condensed && children}</ButtonContent>
            {popout && (
                <DropDown
                    key={popoutOpen}
                    visible={popoutOpen}
                    links={popout}
                    btnDropdown={true}
                    width={popoutWidth}></DropDown>
            )}
        </ButtonContainer>
    );

    return <>{popout ? <OutsideAlerter onClickOutside={onClickOutside}>{content}</OutsideAlerter> : content}</>;
};

Button.propTypes = {
    /** Whether to display as a 100% width block */
    block: PropTypes.bool,
    /** Children the component contains */
    children: PropTypes.node,
    /** Button type. defaults to default. Values: default, outline, soft, table */
    type: PropTypes.string,
    /** If button is small */
    small: PropTypes.bool,
    /** if the button is disabled. */
    disabled: PropTypes.bool,
    /** on click function */
    onClick: PropTypes.func,
    /** name of icon to display */
    icon: PropTypes.string,
    /** If to show icon on the right */
    iconRight: PropTypes.bool,
    /** If to show a condensed version of the button (icon only) */
    condensed: PropTypes.bool,
    /** If to show a popout menu when clicked,
        array to contain objects with id, label, and onClick */
    popout: PropTypes.arrayOf(PropTypes.object),
    /** If to show a white line to separate the right icon */
    separateRightIcon: PropTypes.bool,
    /** Displays a flashing yellow circle to indicate an action is required */
    isAnimated: PropTypes.bool,
    /** Adding margin to button */
    margin: PropTypes.string,
    /** Remove border */
    noBorder: PropTypes.bool,
    /** Removes auto capitalize */
    noUppercase: PropTypes.bool,
    /** Width of popout */
    popoutWidth: PropTypes.string,
};

Button.defaultProps = {
    isAnimated: false,
    block: false,
    children: null,
    type: 'default',
    small: false,
    disabled: false,
    onClick: () => {},
    icon: null,
    iconRight: false,
    condensed: false,
    popout: null,
    separateRightIcon: false,
    margin: '0',
    noBorder: false,
    noUppercase: false,
    popoutWidth: '200px',
};

export default Button;

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const ModalContainer = styled.div`
    width: 728px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    background: #fff;
    border: 2px solid #dcdcdc;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 0 20px 30px 20px;
    border-radius: 4px;
    font-family: arial;
    z-index: 1000;
    margin: 120px auto;
    position: relative;
    @media (max-width: 400px) {
        margin: 0 auto;
        max-height: 100vh;
    }
    @media (max-width: 768px) {
        padding: 0 20px 20px 20px;
    }
    @media (max-width: 728px) {
        width: 100vw;
    }
`;

export const ClosingIcon = styled(Icon)`
    position: absolute;
    right: 20px;
    top: 20px;
    &:hover {
        cursor: pointer;
    }
`;

const ModalShade = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    background: rgba(25, 25, 25, 0.6);
    z-index: 1000;
    top: 0;
    left: 0;
`;

const Heading = styled.h2`
    color: ${props => props.theme.text};
    padding-top: 20px;
    padding-bottom: 20px;
    font-weight: 700;
    font-size: ${props => props.theme.fontSizeL};
    @media (max-width: 768px) {
        font-size: ${props => props.theme.baseFontSize};
    }
`;

const Modal = ({heading, children, onHide, hideOnClickOutside, className}) => {
    const onModalClick = e => e.stopPropagation();
    return (
        <ModalShade className={className} onClick={hideOnClickOutside ? onHide : () => {}}>
            <ModalContainer onClick={onModalClick}>
                <Heading>{heading}</Heading>
                <div>{children}</div>
                <ClosingIcon name="close" onClick={onHide} />
            </ModalContainer>
        </ModalShade>
    );
};

Modal.propTypes = {
    className: PropTypes.string,
    /** Heading In Modal */
    heading: PropTypes.string,
    /** Content in Modal */
    children: PropTypes.node,
    /** onHide modal function */
    onHide: PropTypes.func.isRequired,
    /** Indicate whether clicking outside the modal closes it */
    hideOnClickOutside: PropTypes.bool,
};

Modal.defaultProps = {
    heading: null,
    children: null,
    hideOnClickOutside: true,
};

export default Modal;

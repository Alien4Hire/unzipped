import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
    border-radius: ${({radius}) => radius ? radius : '0px'};
    height: ${({height}) => height ? height : 'auto'};
    width: ${({width}) => width ? width : 'auto'};
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    margin: ${({margin}) => margin ? margin : 'unset'}
`;

const Img = styled.img`
    width: 100%;
    height: auto;
`;

const Image = ({src, alt = 'img', radius, height, width, onMouseEnter, onClick, margin}) => {
    return (
        <Container radius={radius} margin={margin} height={height} width={width} onClick={onClick} onMouseEnter={onMouseEnter}>
            <Img src={src} alt={alt} />
        </Container>
    )
}

export default Image;
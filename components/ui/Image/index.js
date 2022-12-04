import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
    border-radius: ${({radius}) => radius ? radius : '0px'};
    height: ${({height}) => height ? height : 'auto'};
    width: ${({width}) => width ? width : 'auto'};
    overflow: hidden;
`;

const Img = styled.img`
    width: 100%;
    height: auto;
`;

const Image = ({src, alt = 'img', radius, height, width}) => {
    return (
        <Container radius={radius} height={height} width={width}>
            <Img src={src} alt={alt} />
        </Container>
    )
}

export default Image;
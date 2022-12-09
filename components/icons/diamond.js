import React from 'react'

const DiamondIcon = ({width, height, color="#E25050"}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
            <path d="M21.868 9.504l-4-7A.999.999 0 0 0 17 2H7a.999.999 0 0 0-.868.504l-4 7a.997.997 0 0 0 .095 1.129l9 11.001a.999.999 0 0 0 1.546 0l9-11.001a.997.997 0 0 0 .095-1.129zM10.517 9L12 5.539 13.483 9h-2.966zm3.174 2L12 17.2 10.31 11h3.381zm-.174-7h2.157l-.863 3.021L13.517 4zM9.189 7.021L8.326 4h2.157L9.189 7.021zM7.674 9H4.723L6.69 5.557 7.674 9zm.562 2l1.563 5.731L5.11 11h3.126zm7.528 0h3.126l-4.688 5.731L15.764 11zm.562-2l.983-3.443L19.277 9h-2.951z"></path>
        </svg>
    )
}

export default DiamondIcon


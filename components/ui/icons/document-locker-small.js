import React from 'react'

const alertDoneIcon = ({width, height, color="#E25050"}) => {
    return (
        <svg width="20" height="26" viewBox="0 0 50 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_11321_135028)">
        <path d="M43.3618 54.2806C44.1122 54.279 44.8314 53.9889 45.3618 53.4739C45.8922 52.9589 46.1906 52.261 46.1918 51.533V16.4942L33.2983 3.43456H12.1999C11.4483 3.43511 10.7278 3.72499 10.1964 4.24055C9.66496 4.7561 9.36616 5.45519 9.36559 6.18429V51.533C9.36673 52.2617 9.66578 52.9603 10.1971 53.4754C10.7285 53.9905 11.4487 54.2801 12.1999 54.2806H43.3618ZM43.3618 57.7152H12.1999C10.5102 57.7135 8.89013 57.0617 7.69512 55.9028C6.50012 54.7438 5.82773 53.1723 5.82544 51.533V6.18429C5.82715 4.54463 6.49929 2.97259 7.69436 1.81317C8.88943 0.653755 10.5098 0.00166323 12.1999 0H34.8093L49.7341 15.1162V51.533C49.7318 53.1719 49.0597 54.7431 47.8652 55.902C46.6706 57.0609 45.0512 57.713 43.3618 57.7152Z" fill="currentColor"/>
        <path d="M47.1459 19.2229H32.3853C31.9158 19.2229 31.4656 19.042 31.1336 18.72C30.8017 18.3979 30.6152 17.9612 30.6152 17.5058V2.7644H34.1553V15.7885H47.1459V19.2229Z" fill="currentColor"/>
        <path d="M40.1131 26.4651H15.4983C14.997 26.4944 14.504 26.3304 14.1268 26.0088C13.7496 25.6871 13.5186 25.2339 13.4843 24.7478C13.5186 24.2618 13.7496 23.8086 14.1268 23.4869C14.504 23.1653 14.997 23.0013 15.4983 23.0306H40.1066C40.6079 23.0013 41.1008 23.1653 41.478 23.4869C41.8553 23.8086 42.0862 24.2618 42.1206 24.7478C42.0862 25.2328 41.8562 25.685 41.4804 26.0065C41.1046 26.3279 40.6133 26.4927 40.1131 26.4651Z" fill="currentColor"/>
        <path d="M40.1131 33.8026H15.4983C14.997 33.832 14.504 33.6679 14.1268 33.3463C13.7496 33.0247 13.5186 32.5714 13.4843 32.0854C13.5186 31.5993 13.7496 31.1461 14.1268 30.8244C14.504 30.5028 14.997 30.3388 15.4983 30.3681H40.1066C40.6079 30.3388 41.1008 30.5028 41.478 30.8244C41.8553 31.1461 42.0862 31.5993 42.1206 32.0854C42.0862 32.5703 41.8562 33.0225 41.4804 33.344C41.1046 33.6654 40.6133 33.8302 40.1131 33.8026Z" fill="currentColor"/>
        <path d="M40.1131 41.1564H15.4983C14.997 41.1857 14.504 41.0217 14.1268 40.7001C13.7496 40.3784 13.5186 39.9252 13.4843 39.4391C13.5186 38.9531 13.7496 38.4998 14.1268 38.1782C14.504 37.8566 14.997 37.6925 15.4983 37.7219H40.1066C40.6079 37.6925 41.1008 37.8566 41.478 38.1782C41.8553 38.4998 42.0862 38.9531 42.1206 39.4391C42.0862 39.9241 41.8562 40.3763 41.4804 40.6977C41.1046 41.0192 40.6133 41.184 40.1131 41.1564Z" fill="currentColor"/>
        <path d="M40.1131 48.4939H15.4983C14.997 48.5233 14.504 48.3592 14.1268 48.0376C13.7496 47.7159 13.5186 47.2627 13.4843 46.7767C13.5186 46.2906 13.7496 45.8374 14.1268 45.5157C14.504 45.1941 14.997 45.0301 15.4983 45.0594H40.1066C40.6079 45.0301 41.1008 45.1941 41.478 45.5157C41.8553 45.8374 42.0862 46.2906 42.1206 46.7767C42.0862 47.2616 41.8562 47.7138 41.4804 48.0353C41.1046 48.3567 40.6133 48.5215 40.1131 48.4939Z" fill="currentColor"/>
        <path d="M37.73 63.9978H6.56803C4.87833 63.9961 3.25829 63.3443 2.06329 62.1853C0.868281 61.0264 0.195889 59.4549 0.193604 57.8156L0.193604 12.4669C0.195318 10.8272 0.867458 9.25519 2.06252 8.09577C3.25759 6.93635 4.87795 6.28426 6.56803 6.28259H6.66949V9.71715H6.56803C5.81688 9.71826 5.09686 10.0084 4.56592 10.5239C4.03498 11.0394 3.73648 11.7381 3.73591 12.4669V57.8156C3.73705 58.544 4.0358 59.2422 4.56668 59.7572C5.09756 60.2723 5.81726 60.5621 6.56803 60.5632H37.73C38.4804 60.5616 39.1995 60.2715 39.7299 59.7565C40.2604 59.2415 40.5588 58.5436 40.5599 57.8156V57.715H44.1023V57.8156C44.1 59.4545 43.4279 61.0257 42.2333 62.1846C41.0388 63.3435 39.4193 63.9956 37.73 63.9978Z" fill="currentColor"/>
        </g>
        <defs>
        <clipPath id="clip0_11321_135028">
        <rect width="49.5405" height="64" fill="white" transform="translate(0.193604)"/>
        </clipPath>
        </defs>
        </svg>
    )
}

export default alertDoneIcon


import React from 'react'

const alertDoneIcon = ({width, height, color="#E25050"}) => {
    return (
        <svg width="75" height="83" viewBox="0 0 75 83" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_10928_135209)">
        <path d="M51.62 16.859H2.545C2.27641 16.8589 2.01043 16.9117 1.76226 17.0144C1.51409 17.1171 1.2886 17.2678 1.09867 17.4577C0.908752 17.6476 0.758123 17.8731 0.655399 18.1213C0.552674 18.3694 0.499869 18.6354 0.5 18.904V80.247C0.499869 80.5156 0.552674 80.7816 0.655399 81.0298C0.758123 81.2779 0.908752 81.5034 1.09867 81.6933C1.2886 81.8833 1.51409 82.0339 1.76226 82.1366C2.01043 82.2393 2.27641 82.2921 2.545 82.292H51.62C51.8886 82.2921 52.1546 82.2393 52.4027 82.1366C52.6509 82.0339 52.8764 81.8833 53.0663 81.6933C53.2563 81.5034 53.4069 81.2779 53.5096 81.0298C53.6123 80.7816 53.6651 80.5156 53.665 80.247V18.904C53.6651 18.6354 53.6123 18.3694 53.5096 18.1213C53.4069 17.8731 53.2563 17.6476 53.0663 17.4577C52.8764 17.2678 52.6509 17.1171 52.4027 17.0144C52.1546 16.9117 51.8886 16.8589 51.62 16.859ZM49.575 78.203H4.59V20.949H49.575V78.203Z" fill="currentColor" stroke="currentColor"/>
        <path d="M14.814 37.308H39.351C39.8934 37.308 40.4136 37.0926 40.7971 36.709C41.1806 36.3255 41.396 35.8054 41.396 35.263C41.396 34.7206 41.1806 34.2005 40.7971 33.817C40.4136 33.4335 39.8934 33.218 39.351 33.218H14.814C14.2717 33.218 13.7515 33.4335 13.368 33.817C12.9845 34.2005 12.769 34.7206 12.769 35.263C12.769 35.8054 12.9845 36.3255 13.368 36.709C13.7515 37.0926 14.2717 37.308 14.814 37.308Z" fill="currentColor" stroke="currentColor"/>
        <path d="M14.814 49.5761H39.351C39.8934 49.5761 40.4136 49.3606 40.7971 48.9771C41.1806 48.5936 41.396 48.0734 41.396 47.5311C41.396 46.9887 41.1806 46.4686 40.7971 46.0851C40.4136 45.7015 39.8934 45.4861 39.351 45.4861H14.814C14.2717 45.4861 13.7515 45.7015 13.368 46.0851C12.9845 46.4686 12.769 46.9887 12.769 47.5311C12.769 48.0734 12.9845 48.5936 13.368 48.9771C13.7515 49.3606 14.2717 49.5761 14.814 49.5761Z" fill="currentColor" stroke="currentColor"/>
        <path d="M14.814 61.844H39.351C39.8934 61.844 40.4136 61.6286 40.7971 61.2451C41.1806 60.8616 41.396 60.3414 41.396 59.799C41.396 59.2567 41.1806 58.7365 40.7971 58.353C40.4136 57.9695 39.8934 57.754 39.351 57.754H14.814C14.5455 57.754 14.2796 57.8069 14.0315 57.9097C13.7833 58.0125 13.5579 58.1631 13.368 58.353C13.1781 58.5429 13.0275 58.7683 12.9247 59.0164C12.8219 59.2646 12.769 59.5305 12.769 59.799C12.769 60.0676 12.8219 60.3335 12.9247 60.5816C13.0275 60.8297 13.1781 61.0552 13.368 61.2451C13.5579 61.435 13.7833 61.5856 14.0315 61.6884C14.2796 61.7911 14.5455 61.844 14.814 61.844Z" fill="currentColor" stroke="currentColor"/>
        <path d="M72.2511 4.60103L27.2661 0.509028C26.733 0.475004 26.207 0.645421 25.7951 0.985588C25.3832 1.32576 25.1164 1.8101 25.0491 2.34003L24.2191 10.519C24.1921 10.786 24.218 11.0557 24.2952 11.3127C24.3724 11.5696 24.4995 11.8089 24.6692 12.0168C24.8389 12.2246 25.0479 12.397 25.2842 12.5241C25.5206 12.6512 25.7796 12.7305 26.0466 12.7575C26.3136 12.7845 26.5833 12.7587 26.8402 12.6814C27.0972 12.6042 27.3365 12.4771 27.5443 12.3074C27.7522 12.1377 27.9246 11.9287 28.0517 11.6924C28.1788 11.4561 28.2581 11.197 28.2851 10.93L28.9121 4.76603L69.8511 8.48603L64.9191 64.959L60.1591 64.121C59.6252 64.0267 59.0758 64.1484 58.6316 64.4592C58.1874 64.7701 57.8849 65.2446 57.7906 65.7785C57.6963 66.3124 57.818 66.8619 58.1288 67.3061C58.4397 67.7502 58.9142 68.0527 59.4481 68.147L66.4051 69.373C66.5222 69.3945 66.641 69.4053 66.7601 69.405C67.2717 69.4052 67.7647 69.2135 68.1419 68.8679C68.519 68.5222 68.7528 68.0477 68.7971 67.538L74.1091 6.81403C74.1557 6.27428 73.9862 5.7381 73.6379 5.32319C73.2895 4.90829 72.7908 4.64856 72.2511 4.60103Z" fill="currentColor" stroke="currentColor"/>
        </g>
        <defs>
        <clipPath id="clip0_10928_135209">
        <rect width="74.62" height="82.793" fill="white"/>
        </clipPath>
        </defs>
        </svg>
    )
}

export default alertDoneIcon


import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {useRouter} from 'next/router';


const MenuDropdown = styled.div`
    position: absolute;
    width: 220px;
    top: ${({right}) => right ? '50px' : '84px'};
    right: ${({right}) => right ? '0px' : 'unset'};
    border-radius: 5px;
    box-shadow: 0 0 12px #00000029,0 8px 24px #0003;
    padding: 10px 10px;
    background-color: #fff;
    z-index: 99;
`;

const Row = styled.span`
    display: flex;
    flex-flow: row;
    align-items center;
`;

const Span3 = styled.div`
    margin-top: 15px;
    cursor: pointer;
    margin-left: 5px;
    &:hover {
        color: #8EDE64;
    }
    &:last-child {
        margin-bottom: 10px;
    }
`;

const HR = styled.hr``;

const Dropdown = ({items, ref, onClose, token, right, top}) => {
    const profileRef = useRef(null);
    const router = useRouter();
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                onClose(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileRef]);

    return (
        <MenuDropdown ref={profileRef} onMouseLeave={() => onClose()} right={right} top={top}>
        {items?.map((e, index) => {
            if (e.name === "<hr />") {
                return <HR key={index}/> 
            }
            return (
                <Row key={e.name + index}  onClick={() => e?.onClick ? e?.onClick(token) : () => router.push(e.link)}>{e.icon}<Span3>{e.name}</Span3></Row>
            )
        })}
        </MenuDropdown>
    )
}

export default Dropdown;
import React from 'react';
import styled from 'styled-components';
import Image from '../../ui/Image'
import Button from '../../ui/Button'
import Badge from '../../ui/Badge'
import { useRouter } from 'next/router'
import {
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
    DarkSpan,
    Underline,
} from './style'

const Container = styled.div`
    display: flex;
    flex-flow: row;
    padding: ${({includeRate}) => includeRate ? '0px 10px 0px 20px' : '15px 10px 0px 20px'};
`;
const Left = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    margin: 0px 10px;
`;
const Right = styled.div`
    padding: ${({includeRate}) => includeRate ? '5px 30px' : '15px 30px'};
    min-width: 850px;
`;

const Flex = styled.div`
    display: flex;
    flex-flow: row;
    justify-items: space-between;
`;



const FreelancerCard = ({user, includeRate, clearSelectedFreelancer}) => {
    const router = useRouter()
    const redirectToProfile = () => {
        clearSelectedFreelancer()
        if (user?.id) {
            router.push(`/freelancers/${user.id}`)
        }
    }
    return (
        <Container includeRate={includeRate}>
            <Left>
                <Image src={user.profilePic} alt={user.name + ' profile'} height="94px" width="94px" radius="50%"/>
                <Button margin="20px 0px" type={!user.isInvited ? "default" : "grey"} noBorder>{user.isInvited ? 'Invited' : 'Invite'}</Button>
            </Left>
            <Right includeRate={includeRate}>
                <TitleText half color="blue" onClick={redirectToProfile}>{user.name}</TitleText>
                <TitleText noMargin>{user.type}</TitleText>
                {user?.country && <DarkText half>{user.country}</DarkText>}
                {includeRate && (
                    <Flex>
                        <DarkText half>$<DarkSpan fontSize="18px">{user?.rate}</DarkSpan> / hour</DarkText>
                        {user?.likes > 0 && <DarkText noMargin>{user.likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} UPVOTES BY CLIENTS</DarkText>}
                    </Flex>
                )}
                {user.skills?.length > 0 && user.skills.map(item => (
                    <Badge>{item}</Badge>
                ))}
                {user?.cover && (
                    <DarkText topMargin="10px"><strong>cover letter: </strong>
                    {user.cover}
                    </DarkText>
                )}
            </Right>
            <Absolute><Button normal oval type="green2" noBorder onClick={redirectToProfile}>View Profile</Button></Absolute>
        </Container>
    )
}

export default FreelancerCard;
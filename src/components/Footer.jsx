import { Stack, Text } from "@chakra-ui/react";
import UniIcon from "../utils/UniIcon";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <Stack bgColor={'background.dark'} p={8} gap={4} color={'white'}>
            <Stack>
                <Text fontSize={'2xl'} fontWeight={700}>Real Estate</Text>
            </Stack>
            <Stack flexDir={'row'} justifyContent={'center'} gap={4} alignItems={'center'} flexWrap={'wrap'} cursor={'pointer'}>
                <Link to='https://x.com/Maurici89494430' target="_blank">
                    <UniIcon icon='UilTwitter' size="30" color='white' />
                </Link>
                <Link to='https://www.linkedin.com/in/mauricio-santos-rebolledo-9a0924137/' target="_blank">
                    <UniIcon icon='UilGithub' size="30" color='white' />
                </Link>
                <Link to='https://github.com/MauricioSantos12' target="_blank">
                    <UniIcon icon='UilLinkedin' size="30" color='white' />
                </Link>
            </Stack>
            <Text>© {new Date().getFullYear()} Real Estate. All rights reserved.</Text>
        </Stack>


    );
}

export default Footer;

import { Stack, Text } from "@chakra-ui/react";
import UniIcon from "../utils/UniIcon";

function Footer() {
    return (
        <Stack bgColor={'background.dark'} p={8} gap={4} color={'white'}>
            <Stack>
                <Text fontSize={'2xl'} fontWeight={700}>Real Estate</Text>
            </Stack>
            <Stack flexDir={'row'} justifyContent={'center'} gap={4} alignItems={'center'} flexWrap={'wrap'} cursor={'pointer'}>
                <UniIcon icon='UilFacebookF' size="30" color='white' />
                <UniIcon icon='UilInstagram' size="30" color='white' />
                <UniIcon icon='UilTwitter' size="30" color='white' />
                <UniIcon icon='UilYoutube' size="30" color='white' />
                <UniIcon icon='UilSolid' size="30" color='white' />
                <UniIcon icon='UilLinkedin' size="30" color='white' />
            </Stack>
            <Text>© {new Date().getFullYear()} Real Estate. All rights reserved.</Text>
        </Stack>


    );
}

export default Footer;

import { Container, Stack, Link, Image, Button } from "@chakra-ui/react";
import logo from '../assets/logo.png'
import { useAuth } from "../context/useAuth";
function Navbar() {
    const { user, logout } = useAuth();
    const routes = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Properties",
            path: "/properties"
        },
        {
            name: "Login",
            path: "/login"
        },
        {
            name: "Dashboard",
            path: "/dashboard"
        }
    ]
    return (
        <Stack padding={'1rem'} boxShadow={'lg'} position={'sticky'} top={'0'} zIndex={1} bg={'white'}>
            <Container w={'100%'} maxW={'container.xl'}>
                <Stack display={'flex'} flexDir={'row'} width={'100%'} justifyContent={'space-between'} alignItems={'center'} >
                    <Stack display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Image src={logo} alt="logo" width='auto' height={'auto'} maxH={'50px'} />
                    </Stack>
                    <Stack display={'flex'} flexDir={'row'} justifyContent={'space-between'} alignItems={'center'} gap={6}>
                        {
                            routes.map(route => {
                                return (
                                    <Link fontSize={'md'} fontWeight={600} textDecoration={'none'} _hover={{ textDecoration: 'none', color: 'primary.default', transition: 'all 0.2s ease-in-out' }} to={route.path} key={route.name} ><a href={route.path}>{route.name}</a></Link>

                                )
                            })
                        }
                    </Stack>
                    {
                        user && (
                            <Stack display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <Button variant={'secondary'} onClick={logout}>Logout</Button>
                            </Stack>
                        )
                    }

                </Stack>
            </Container >
        </Stack >
    );
}

export default Navbar;

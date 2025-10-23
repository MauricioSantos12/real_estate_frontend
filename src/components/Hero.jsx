import React from 'react'
import heroImage from '../assets/home/hero-property.jpg'
import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react'
const Hero = () => {

    const smoothScroll = () => {
        const element = document.getElementById('properties');
        element.scrollIntoView({ behavior: 'smooth' });
    }
    return (
        <Stack w={'100%'} backgroundImage={heroImage} backgroundPosition={'center'} backgroundRepeat={'no-repeat'} backgroundSize={'cover'} height={{ base: '24rem', md: '40rem' }} position={'relative'} >
            <Container maxW={'container.xl'} w={'100%'} h={'100%'}>
                <Stack p={'3rem'} gap={6} flexDir={'column'} alignItems={'center'} justifyContent={'center'} h={'100%'} w={'100%'}>
                    <Heading fontSize={{ base: '2xl', md: '5xl' }} color={'white'}>Encuentra tu Hogar Ideal</Heading>
                    <Text fontSize={{ base: 'lg', md: '2xl' }} color={'white'}>Las mejores propiedades en las ubicaciones más exclusivas</Text>
                    <Button w={'fit-content'} variant={'secondary'} onClick={smoothScroll}>Explorar propiedades</Button>
                </Stack>
            </Container>
        </Stack>
    )
}

export default Hero
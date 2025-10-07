import { Container, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import UniIcon from '../utils/UniIcon'

const Stadistics = () => {
    const data = [
        {
            number: 6,
            text: 'Años de experiencia',
            icon: 'UilBuilding'
        },
        {
            number: 12,
            text: 'Ventas este mes',
            icon: 'UilChartLine'
        },
        {
            number: 150,
            text: 'Clientes satisfechos',
            icon: 'UilUsersAlt'
        }
    ]
    return (
        <Stack w={'100%'} justifyContent={'space-between'} flexDir={'row'} alignItems={'center'} gap={6} bgColor={'white'} py={16} px={8}>
            <Container maxW={'container.xl'} w={'100%'} h={'100%'}>
                <Stack flexDir={'row'} justifyContent={'center'} alignItems={'stretch'} gap={8} flexWrap={'wrap'}>
                    {
                        data.map((item, index) => {
                            return (
                                <Stack flexDir={'column'} justifyContent={'center'} alignItems={'center'} key={index} p={'2rem'} gap={4} bg='white' boxShadow={'xl'} borderRadius={8} minW={'350px'}>
                                    <UniIcon icon={item.icon.trim()} size={70} color='baseColor' />
                                    <Text fontSize={'5xl'} fontWeight={700} color={'primary.default'}>{item.number}</Text>
                                    <Text fontSize={'xl'} color={'text.light'}>{item.text}</Text>
                                </Stack>
                            )
                        })
                    }

                </Stack>
            </Container>

        </Stack>
    )
}

export default Stadistics
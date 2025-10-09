import { Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import UniIcon from '../../utils/UniIcon'

const PrincipalView = ({ properties, users, comments }) => {
    const stadistics = [
        {
            number: properties?.length,
            text: 'Propiedades',
            icon: 'UilMapMarker'
        },
        {
            number: users?.length,
            text: 'Usuarios',
            icon: 'UilUsersAlt'
        },
        {
            number: comments?.length,
            text: 'Comentarios',
            icon: 'UilComment'
        }
    ]

    return (
        <Stack flexDir={'column'} justifyContent={'flex-start'} alignItems={'flex-start'} w={'100%'} h={'100%'}>
            <Text fontSize={'3xl'} w={'100%'} textAlign={'center'} fontWeight={'bold'}>Welcome to the Dashboard</Text>
            <Stack flexDir={'row'} justifyContent={'center'} alignItems={'center'} w={'100%'} h={'auto'} gap={8} mt={4} flexWrap={'wrap'}>
                {
                    stadistics.map(stadistic => {
                        return (
                            <Stack gap={2} boxShadow={'md'} flexDir={'column'} justifyContent={'center'} alignItems={'center'} h={'auto'} bg={'white'} borderRadius={6} p={6} w={'fit-content'} minW={'300px'}>
                                <UniIcon icon={stadistic?.icon} size={10} color='primary.default' cursor={'pointer'} />
                                <Text fontSize={'3xl'} w={'100%'} textAlign={'center'} fontWeight={'bold'}>{stadistic?.text}</Text>
                                <Text fontSize={'xl'} w={'100%'} textAlign={'center'}>{stadistic?.number}</Text>
                            </Stack>
                        )
                    })
                }
            </Stack>
        </Stack>
    )
}

export default PrincipalView
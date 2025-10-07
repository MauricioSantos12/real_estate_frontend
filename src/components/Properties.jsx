import { Button, Container, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import UniIcon from '../utils/UniIcon'

const Properties = () => {
    const properties = [
        {
            title: 'Casa en venta en la playa',
            description: 'Casa en venta en la playa con 3 habitaciones, 2 ba os, patio, jard n y cocina equipada.',
            type: 'Casa',
            icon: 'UilMapMarker',
            price: '$150,000',
            image: 'https://picsum.photos/200',
            address: 'Calle 123',
            city: 'Mexico',
            state: 'DF',
            zip_code: '12345',
            bathrooms: 2,
            bedrooms: 3,
            area_sqft: 150,
            status: 'Available',
            is_active: true
        },
        {
            title: 'Departamento en renta en el centro',
            description: 'Departamento en renta en el centro con 2 habitaciones, 1 ba o, cocina equipada y vista al parque.',
            type: 'Departamento',
            icon: 'UilMapMarker',
            price: '$8,000 al mes',
            image: 'https://picsum.photos/200',
            address: 'Avenida 5 de mayo',
            city: 'Mexico',
            state: 'DF',
            zip_code: '12345',
            bathrooms: 1,
            bedrooms: 2,
            area_sqft: 80,
            status: 'Available',
            is_active: true
        },
        {
            title: 'Casa en venta en la costa',
            description: 'Casa en venta en la costa con 4 habitaciones, 3 ba os, patio, jard n y cocina equipada.',
            type: 'Casa',
            icon: 'UilMapMarker',
            price: '$500,000',
            image: 'https://picsum.photos/200',
            address: 'Calle de la playa',
            city: 'Canc n',
            state: 'QR',
            zip_code: '77500',
            bathrooms: 3,
            bedrooms: 4,
            area_sqft: 250,
            status: 'Available',
            is_active: true
        },
        {
            title: 'Departamento en renta en la playa',
            description: 'Departamento en renta en la playa con 3 habitaciones, 2 ba os, cocina equipada y vista al parque.',
            type: 'Departamento',
            icon: 'hotel',
            price: '$12,000 al mes',
            image: 'https://picsum.photos/200',
            address: 'Calle 1',
            city: 'Guadalajara',
            state: 'JL',
            zip_code: '44800',
            bathrooms: 2,
            bedrooms: 3,
            area_sqft: 120,
            status: 'Available',
            is_active: true
        }
    ]
    return (
        <Stack w={'100%'} justifyContent={'space-between'} flexDir={'row'} alignItems={'center'} gap={6} bgColor={'white'} py={16} px={8}>
            <Container maxW={'container.xl'} w={'100%'} h={'100%'} gap={2} display={'flex'} flexDir={'column'}>
                <Heading as='h3' fontSize={'3xl'} fontWeight={700} w={'100%'} textAlign={'left'}> Propiedades destacadas</Heading>
                <Text fontSize={'lg'} w={'100%'} textAlign={'left'} color={'text.light'}>4 propiedades encontradas</Text>
                <Stack flexDir={'column'} alignItems={'flex-start'} w='1005'>
                    <Button variant={'solid'}>Filtros</Button>
                </Stack>
                <Stack flexDir={'row'} justifyContent={'center'} alignItems={'stretch'} gap={8} flexWrap={'wrap'}>
                    {
                        properties && properties.length > 0 && (
                            properties.map(property => {
                                return (
                                    <Stack flexDir={'column'} justifyContent={'center'} alignItems={'center'} key={property?.id} p={'2rem'} gap={4} bg='white' boxShadow={'xl'} borderRadius={8} w={'350px'} >
                                        <Image src={property?.image} alt={property?.title} width='auto' height={'auto'} maxH={'200px'} />
                                        <Text fontSize={'xl'} fontWeight={700} w={'100%'}>{property?.title}</Text>
                                        <Stack display={'flex'} alignItems={'flex-start'} justifyContent={'flex-start'} gap={2} flexDir={'row'} flexWrap={'nowrap'} w={'100%'}>
                                            <UniIcon icon={'UilMapMarker'} size={22} color={'primary.default'} /> <Text fontSize={'md'} fontWeight={500} w={'fit-content'} color={'text.light'}>{property?.address}</Text>
                                        </Stack>
                                        <Text fontSize={'lg'} fontWeight={500} w={'100%'} color={'text.light'}>{property?.description}</Text>
                                        <Stack display={'flex'} alignItems={'flex-start'} justifyContent={'center'} gap={1} flexDir={'row'} flexWrap={'nowrap'} w={'100%'}>
                                            <Stack display={'flex'} alignItems={'flex-start'} justifyContent={'flex-start'} gap={2} flexDir={'row'} flexWrap={'nowrap'} w={'100%'}>
                                                <UniIcon icon={'UilSleep'} size={22} color={'primary.default'} /> <Text fontSize={'md'} fontWeight={500} w={'fit-content'} color={'text.light'}>{property?.bedrooms}</Text>
                                            </Stack>
                                            <Stack display={'flex'} alignItems={'flex-start'} justifyContent={'flex-start'} gap={2} flexDir={'row'} flexWrap={'nowrap'} w={'100%'}>
                                                <UniIcon icon={'UilBath'} size={22} color={'primary.default'} /> <Text fontSize={'md'} fontWeight={500} w={'fit-content'} color={'text.light'}>{property?.bathrooms}</Text>
                                            </Stack>
                                            <Stack display={'flex'} alignItems={'flex-start'} justifyContent={'flex-start'} gap={2} flexDir={'row'} flexWrap={'nowrap'} w={'100%'}>
                                                <UniIcon icon={'UilSquareShape'} size={22} color={'primary.default'} /> <Text fontSize={'md'} fontWeight={500} w={'fit-content'} color={'text.light'}>{property?.area_sqft} m²</Text>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                )
                            })
                        )
                    }
                </Stack>

            </Container>
        </Stack>
    )
}

export default Properties
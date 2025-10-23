import { Button, Container, Heading, Image, Select, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import UniIcon from '../utils/UniIcon'
import UseFetch from '../utils/UseFetch'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'

const Properties = () => {
    const endponit = '/properties'
    const { data, loading, error, fetchData } = UseFetch()
    const [sortedData, setSortedData] = useState([]);
    const navigate = useNavigate();
    const status = [
        {
            id: 1,
            bgColor: 'green.500',
            color: 'white'
        },
        {
            id: 2,
            bgColor: 'blue.500',
            color: 'white'
        },
        {
            id: 3,
            bgColor: 'red.500',
            color: 'white'
        },
        {
            id: 4,
            bgColor: 'orange.500',
            color: 'white'
        }
    ]

    const types = [
        {
            id: 1,
            bgColor: 'blue.100',
            color: 'blue.300'
        },
        {
            id: 2,
            bgColor: 'green.100',
            color: 'green.300'
        },
        {
            id: 3,
            bgColor: 'orange.100',
            color: 'orange.300'
        }

    ]

    useEffect(() => {
        fetchData({
            url: endponit,
            method: 'GET',
        }).then((data) => setSortedData(data));
    }, [fetchData]);

    const handleFilter = (e) => {
        const value = e.target.value;
        if (value === 'featured') {
            setSortedData(data.filter(property => property.featured));
        } else if (value === 'moreValue') {
            setSortedData([...data].sort((a, b) => b.price - a.price));
        } else if (value === 'lessValue') {
            setSortedData([...data].sort((a, b) => a.price - b.price));
        } else {
            setSortedData(data);
        }
    }

    if (loading) return <Loading />;
    if (error) return <Text color={'red.500'}>Error: {error}</Text>;
    return (
        <Stack w={'100%'} justifyContent={'space-between'} flexDir={'row'} alignItems={'center'} gap={6} bgColor={'white'} py={16} px={8} id='properties'>
            <Container maxW={'container.xl'} w={'100%'} h={'100%'} display={'flex'} flexDir={'column'} gap={6}>
                <Stack flexDir={{ base: 'column', md: 'row' }} justifyContent={'space-between'} alignItems={'flex-start'} gap={6} >
                    <Stack gap={4}>
                        <Heading as='h3' fontSize={'4xl'} fontWeight={700} w={'100%'} textAlign={'left'}> Propiedades destacadas</Heading>
                        <Text fontSize={'xl'} w={'100%'} textAlign={'left'} color={'text.light'}>{sortedData?.length} propiedades encontradas</Text>
                    </Stack>
                    <Select placeholder='Selecionar una opción' w={'fit-content'} onChange={handleFilter}>
                        {/* <option value='featured'>Destacadas</option> */}
                        <option value='lessValue'>Menor valor</option>
                        <option value='moreValue'>Mayor valor</option>
                    </Select>
                </Stack>
                <Stack flexDir={'row'} justifyContent={'center'} alignItems={'stretch'} gap={8} flexWrap={'wrap'} w={'100%'} h={'100%'}>
                    {
                        sortedData && sortedData.length > 0 && (
                            sortedData.map(property => {
                                const image = property?.image_urls?.images && property?.image_urls?.images.length > 0 ? property?.image_urls?.images[0] : null;
                                const statusProperty = status.find(status => status.id === property?.status?.id);
                                const typeProperty = types.find(type => type.id === property?.property_type?.id);

                                return (
                                    <Stack flexDir={'column'} justifyContent={'center'} alignItems={'center'} key={property?.id} gap={4} bg='white' boxShadow={'xl'} borderRadius={8} w={{ base: '100%', md: '400px', lg: '500px' }} h={'auto'}
                                        sx={{
                                            "&:hover": {
                                                img: {
                                                    // transform: "scale(1.01)",
                                                    transition: "all 0.2s ease-in-out"
                                                },
                                                "#property-title": {
                                                    color: "primary.default",
                                                    transition: "all 0.2s ease-in-out"
                                                },
                                                "#property-card": {
                                                    transform: "scale(1.01)",
                                                    transition: "all 0.2s ease-in-out"
                                                }
                                            },
                                        }} >
                                        <Stack position={'relative'} w={'100%'} p={0} m={0}>
                                            <Stack position={'absolute'} w={'100%'} h={'100%'}>
                                                <Stack position={'relative'} w={'100%'} h={'100%'}>
                                                    <Stack bgColor={'#00000080'} color={'white'} position={'absolute'} bottom={5} left={5} p={2} borderRadius={4}>
                                                        <Text fontSize={'md'} fontWeight={800}>{`${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(property?.price)} COP`}</Text>
                                                    </Stack>
                                                    <Stack display={{ base: 'column', md: 'flex' }} position={'absolute'} w={'100%'} h={'100%'}>
                                                        <Stack bgColor={statusProperty?.bgColor} color={statusProperty?.color} position={'absolute'} p={2} borderRadius={4} top={5} left={5} w='max-content'>
                                                            <Text fontSize={'md'} fontWeight={600} w={'100%'}>{`${property?.status?.name}`}</Text>
                                                        </Stack>
                                                        <Stack bgColor={typeProperty?.bgColor} color={typeProperty?.color} position={'absolute'} p={2} borderRadius={4} top={5} right={5} w='max-content'>
                                                            <Text fontSize={'md'} fontWeight={600} w={'100%'}>{`${property?.property_type?.name}`}</Text>
                                                        </Stack>
                                                    </Stack>


                                                </Stack>
                                            </Stack>
                                            <Image src={image?.image_url} alt={image?.caption} width='100%' height={'auto'} maxH={{ base: '200px', md: '250px' }} objectFit={'cover'} borderTopLeftRadius={8} borderTopRightRadius={8} />
                                        </Stack>
                                        <Stack w={'100%'} h={'100%'} flexDir={'column'} alignItems={'flex-start'} justifyContent={'flex-start'} gap={2} p={4} position={'relative'} id='property-card' >
                                            <Text fontSize={'2xl'} fontWeight={700} w={'100%'} textAlign={'left'} id='property-title'>{property?.title}</Text>
                                            <Stack display={'flex'} alignItems={'flex-start'} justifyContent={'flex-start'} gap={1} flexDir={'row'} flexWrap={'nowrap'} w={'100%'}>
                                                <UniIcon icon={'UilMapMarker'} size={22} color={'text.light'} /> <Text fontSize={'lg'} fontWeight={700} w={'fit-content'} color={'text.light'}>{property?.address}</Text>
                                            </Stack>
                                            <Text fontSize={'lg'} fontWeight={500} w={'100%'} color={'text.light'} textAlign={'justify'}>{property?.description.length > 250 ? property?.description.substring(0, 250) + '...' : property?.description}</Text>
                                            <Stack display={'flex'} alignItems={'flex-start'} justifyContent={'flex-start'} gap={4} flexDir={'row'} flexWrap={'nowrap'} w={'100%'}>
                                                <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} flexDir={'row'} flexWrap={'nowrap'} w={'fit-content'}>
                                                    <UniIcon icon={'UilSleep'} size={22} color={'primary.default'} /> <Text fontSize={'lg'} fontWeight={700} w={'fit-content'} color={'text.light'}>{property?.bedrooms}</Text>
                                                </Stack>
                                                <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} flexDir={'row'} flexWrap={'nowrap'} w={'fit-content'}>
                                                    <UniIcon icon={'UilBath'} size={22} color={'primary.default'} /> <Text fontSize={'lg'} fontWeight={700} w={'fit-content'} color={'text.light'}>{property?.bathrooms}</Text>
                                                </Stack>
                                                <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} flexDir={'row'} flexWrap={'nowrap'} w={'fit-content'}>
                                                    <UniIcon icon={'UilSquareShape'} size={22} color={'primary.default'} /> <Text fontSize={'lg'} fontWeight={700} w={'fit-content'} color={'text.light'}>{property?.area_sqft} m²</Text>
                                                </Stack>
                                            </Stack>
                                            <Stack display={'flex'} alignItems={'flex-start'} justifyContent={'flex-start'} gap={8} flexDir={'row'} flexWrap={'nowrap'} w={'100%'} mt={4} >
                                                <Button variant={'solid'} w={'100%'} onClick={() => navigate(`/property/${property?.id}`)}> <UniIcon icon={'UilEye'} size={22} color={'white'} marginRight={2} /> Ver propiedad</Button>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                )
                            })
                        )
                    }
                </Stack>

            </Container >
        </Stack >
    )
}

export default Properties
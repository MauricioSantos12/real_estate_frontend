import React, { useEffect, useState } from 'react'
import UseFetch from '../utils/UseFetch';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { Button, Divider, Grid, GridItem, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import UniIcon from '../utils/UniIcon';
const PropertyDetail = () => {
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const endponit = `/properties/property/${id}`
    const { data, loading, error, fetchData } = UseFetch()
    const navigate = useNavigate();
    const [typeProperty, setTypeProperty] = useState(null);
    const [statusProperty, setStatusProperty] = useState(null);
    const [images, setImages] = useState([]);
    const [principalImage, setPrincipalImage] = useState(null);
    const [contactData, setContactData] = useState(null);
    const [errorModal, setErrorModal] = useState(null);

    useEffect(() => {
        fetchData({
            url: endponit,
            method: 'GET',
        }).then(response => {
            if (response) {
                setStatusProperty(status.find(status => status.id === response.status?.id));
                setTypeProperty(types.find(type => type.id === response.property_type?.id));
                setImages(response.image_urls?.images);
                setPrincipalImage(response.image_urls?.images[0]);
            }
        });
    }, [fetchData]);

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

    const handleUpdateContactData = (value, name) => {
        setContactData({ ...contactData, [name]: value })
    }

    const sendContactData = () => {
        try {
            console.log(contactData)
            fetchData({
                url: '/email',
                method: 'POST',
                body: {
                    ...contactData,
                    subject: 'Contacto de la propiedad: ' + data?.title
                }
            })
        } catch (error) {
            setErrorModal(error)
        }
    }

    if (loading) return <Loading />;
    // if (error) return <Text color={'red.500'}>Error: {error}</Text>;
    return (
        <>
            <Stack flexDir={'column'} p={8} justifyContent={'center'} alignItems={'center'} key={data?.id} gap={4} bg='white' boxShadow={'xl'} borderRadius={8} w={'100%'} h={'auto'} >
                <Stack flexDir={'row'} flexWrap={'nowrap'} justifyContent={'space-between'} alignItems={'center'} w={'100%'} h={'auto'}>
                    <UniIcon color='black' icon='UilArrowLeft' size={{ base: '30px', md: '40px' }} onClick={() => navigate(-1)} cursor={'pointer'} />
                    <Text fontSize={{ base: 'md', md: '4xl' }} fontWeight={900} w={'100%'} textAlign={'left'} id='property-title'>{data?.title}</Text>

                </Stack>
                <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '2fr 1fr' }} gap={6} w={'100%'}>
                    <GridItem display={'flex'} flexDir={'column'} gap={2} alignItems={'flex-start'} justifyContent={'space-between'}>
                        <Stack position={'relative'} w={'100%'} p={0} m={0}>
                            <Stack position={'absolute'} w={'100%'} h={'100%'}>
                                <Stack position={'relative'} w={'100%'} h={'100%'}>
                                    <Stack bgColor={'#00000080'} color={'white'} position={'absolute'} bottom={5} left={5} p={2} borderRadius={4}>
                                        <Text fontSize={{ base: 'md', md: '2xl' }} fontWeight={800}>{`${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(data?.price)} COP`}</Text>
                                    </Stack>
                                    <Stack display={{ base: 'column', md: 'flex' }} position={'absolute'} w={'100%'} h={'100%'}>
                                        <Stack bgColor={statusProperty?.bgColor} color={statusProperty?.color} position={'absolute'} p={2} borderRadius={4} top={5} left={5} w='max-content'>
                                            <Text fontSize={{ base: 'sm', md: 'lg' }} fontWeight={600} w={'100%'}>{`${data?.status?.name}`}</Text>
                                        </Stack>
                                        <Stack bgColor={typeProperty?.bgColor} color={typeProperty?.color} position={'absolute'} p={2} borderRadius={4} top={5} right={5} w='max-content'>
                                            <Text fontSize={{ base: 'sm', md: 'lg' }} fontWeight={600} w={'100%'}>{`${data?.property_type?.name}`}</Text>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Image src={principalImage?.image_url} alt={principalImage?.caption} width='100%' height={'auto'} maxH={{ base: '350px', md: '550px' }} objectFit={'cover'} borderTopLeftRadius={8} borderTopRightRadius={8} />
                        </Stack>
                    </GridItem>
                    <GridItem display={'flex'} flexDir={'column'} gap={2} alignItems={'flex-start'} justifyContent={'space-between'}>
                        {
                            images && images.length > 0 && (
                                images.map((image, index) => {
                                    if (index == 0) return null
                                    return (
                                        <Image src={image?.image_url} alt={image?.caption} width='100%' height={'auto'} maxH={250} objectFit={'cover'} borderTopLeftRadius={8} borderTopRightRadius={8} />

                                    )
                                })
                            )
                        }
                    </GridItem>
                </Grid>

                <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6} w={'100%'}>
                    <GridItem display={'flex'} flexDir={'column'} gap={2} alignItems={'flex-start'} justifyContent={'space-between'}>
                        <Text fontSize={'2xl'} fontWeight={600} w={'100%'} textAlign={'left'} id='property-title'>Información básica</Text>
                        <Stack display={'flex'} alignItems={'center'} justifyContent={'flex-start'} gap={2} flexDir={'row'} flexWrap={'nowrap'} w={'100%'}>
                            <UniIcon icon={'UilMapMarker'} size={26} color={'text.light'} /> <Text fontSize={'lg'} w={'fit-content'} color={'black'}>{data?.address}</Text>
                        </Stack>
                        <Stack display={'flex'} alignItems={'center'} justifyContent={'flex-start'} gap={2} flexDir={'row'} flexWrap={'nowrap'} w={'100%'}>
                            <UniIcon icon={'UilBuilding'} size={26} color={'text.light'} /> <Text fontSize={'lg'} w={'fit-content'} color={'black'}>{data?.city}</Text>
                        </Stack>
                        <Stack display={'flex'} alignItems={'center'} justifyContent={'flex-start'} gap={2} flexDir={'row'} flexWrap={'nowrap'} w={'100%'}>
                            <UniIcon icon={'UilMap'} size={26} color={'text.light'} /> <Text fontSize={'lg'} w={'fit-content'} color={'black'}>{data?.zip_code}</Text>
                        </Stack>
                        <Divider />
                    </GridItem>
                    <GridItem display={'flex'} flexDir={'column'} gap={2} alignItems={'flex-start'} justifyContent={'space-between'}>
                        <Text fontSize={'2xl'} fontWeight={600} w={'100%'} textAlign={'left'} id='property-title'>Descripción</Text>
                        <Text fontSize={'lg'} fontWeight={500} w={'100%'} color={'text.light'} textAlign={'justify'}>{data?.description.length > 250 ? data?.description.substring(0, 250) + '...' : data?.description}</Text>
                        <Divider />
                    </GridItem>
                </Grid>

                <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6} w={'100%'}>
                    <GridItem display={'flex'} flexDir={'column'} gap={2} alignItems={'flex-start'} justifyContent={'space-between'}>
                        <Text fontSize={'2xl'} fontWeight={600} w={'100%'} textAlign={'left'} id='property-title'>Características</Text>
                        <Stack display={'flex'} alignItems={'flex-start'} justifyContent={'center'} gap={4} flexDir={'row'} flexWrap={'wrap'} w={'100%'}>
                            <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} flexDir={'column'} flexWrap={'nowrap'} w={'fit-content'} bgColor={'gray.100'} p={8} borderRadius={6} minW={150}>
                                <UniIcon icon={'UilSleep'} size={22} color={'primary.default'} />
                                <Text fontSize={'xl'} fontWeight={700} color={'black'}>{data?.bedrooms}</Text>
                                <Text fontSize={'lg'} color={'black'}>Cuartos</Text>
                            </Stack>
                            <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} flexDir={'column'} flexWrap={'nowrap'} w={'fit-content'} bgColor={'gray.100'} p={8} borderRadius={6} minW={150}>
                                <UniIcon icon={'UilBath'} size={22} color={'primary.default'} />
                                <Text fontSize={'lg'} fontWeight={700} w={'fit-content'} color={'black'}>{data?.bathrooms}</Text>
                                <Text fontSize={'lg'} color={'black'}>Baños</Text>
                            </Stack>
                            <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} flexDir={'column'} flexWrap={'nowrap'} w={'fit-content'} bgColor={'gray.100'} p={8} borderRadius={6} minW={150}>
                                <UniIcon icon={'UilSquareShape'} size={22} color={'primary.default'} />
                                <Text fontSize={'lg'} fontWeight={700} w={'fit-content'} color={'black'}>{data?.area_sqft} </Text>
                                <Text fontSize={'lg'} color={'black'}>m²</Text>
                            </Stack>
                        </Stack>
                    </GridItem>
                    <GridItem display={'flex'} flexDir={'column'} gap={4} alignItems={'flex-start'} justifyContent={'flex-start'}>
                        <Text fontSize={'2xl'} fontWeight={600} w={'100%'} textAlign={'left'} id='property-title'>Contacto</Text>
                        <Button display={{ base: 'block', md: 'none' }} variant={'solid'} w={'100%'} h={'auto'} alignItems={'center'} justifyContent={'center'} gap={2} p={4} onClick={() => window.open(`tel:+573102621770`, '_self')}><UniIcon icon={'UilPhone'} size={22} color={'white'} /> Llamar ahora</Button>
                        <Button variant={'outline'} w={'100%'} h={'auto'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} p={4} onClick={() => onOpen()} ><UniIcon icon={'UilMessage'} size={22} color={'primary.default'} /> Enviar mensaje</Button>
                    </GridItem>
                </Grid>


            </Stack>
            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Mayor información</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody gap={2} display={'flex'} flexDir={'column'}>
                        <Text>Nombre</Text>
                        <Input value={contactData?.name} onChange={(e) => handleUpdateContactData(e.target.value, 'name')}></Input>
                        <Text>Email</Text>
                        <Input value={contactData?.email} onChange={(e) => handleUpdateContactData(e.target.value, 'email')}></Input>
                        <Text>Teléfono</Text>
                        <Input value={contactData?.phone} onChange={(e) => handleUpdateContactData(e.target.value, 'phone')}></Input>
                        <Text>Mensaje</Text>
                        <Textarea value={contactData?.message} onChange={(e) => handleUpdateContactData(e.target.value, 'message')}></Textarea>
                        {
                            errorModal && <Text color={'red.500'}>{errorModal}</Text>
                        }
                    </ModalBody>

                    <ModalFooter gap={3}>
                        <Button onClick={onClose} >Cancelar</Button>
                        <Button mr={3} variant={'outline'} onClick={sendContactData}>
                            Enviar mensaje
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PropertyDetail 
import React, { useEffect, useState } from 'react'
import UseFetch from '../../utils/UseFetch';
import { Button, Container, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Switch, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react';
import UniIcon from '../../utils/UniIcon';
import Loading from '../Loading';
import DeleteModal from '../Modal/DeleteModal';
import { propertySchema } from '../../schemas/properties';
import { useAuth } from '../../context/useAuth';
import SelectIcon from '../SelectIcon';

const ContentModal = ({ isOpen, onClose, title, onClick, functionToUpdate, valueToUpdate, cleanOption, errorModal, onClickButtonText }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody gap={2} display={'flex'} flexDir={'column'}>
                    <Text>Título</Text>
                    <Input value={valueToUpdate?.title} onChange={(e) => functionToUpdate(e.target.value, 'title')}></Input>
                    <Text>Descripción</Text>
                    <Input value={valueToUpdate?.description} onChange={(e) => functionToUpdate(e.target.value, 'description')}></Input>
                    <Text>Dirección</Text>
                    <Input value={valueToUpdate?.address} onChange={(e) => functionToUpdate(e.target.value, 'address')}></Input>
                    <Text>Habitaciones</Text>
                    <Input type='number' value={valueToUpdate?.bedrooms} onChange={(e) => functionToUpdate(parseInt(e.target.value), 'bedrooms')}></Input>
                    <Text>Baños</Text>
                    <Input type='number' value={valueToUpdate?.bathrooms} onChange={(e) => functionToUpdate(parseInt(e.target.value), 'bathrooms')}></Input>
                    <Text>Área m2</Text>
                    <Input type='number' value={valueToUpdate?.area_sqft} onChange={(e) => functionToUpdate(parseInt(e.target.value), 'area_sqft')}></Input>
                    <Text>Precio</Text>
                    <Input type='number' value={valueToUpdate?.price} onChange={(e) => functionToUpdate(parseInt(e.target.value), 'price')}></Input>
                    <Text>Ciudad</Text>
                    <Input value={valueToUpdate?.city} onChange={(e) => functionToUpdate(e.target.value, 'city')}></Input>
                    <Text>Estado</Text>
                    <Input value={valueToUpdate?.state} onChange={(e) => functionToUpdate(e.target.value, 'state')}></Input>
                    <Text>Código postal</Text>
                    <Input value={valueToUpdate?.postal_code} onChange={(e) => functionToUpdate(e.target.value, 'zip_code')}></Input>
                    <Text>Tipo de propiedad</Text>
                    <Select placeholder='Selecciona un tipo' value={valueToUpdate?.property_type_id} onChange={(e) => functionToUpdate(parseInt(e.target.value), 'property_type_id')}>
                        <option value={1}>Apartamento</option>
                        <option value={2}>House</option>
                        <option value={3}>Building</option>
                    </Select>
                    <Text>Estado de la propiedad</Text>
                    <Select placeholder='Selecciona un estado' value={valueToUpdate?.status_id} onChange={(e) => functionToUpdate(parseInt(e.target.value), 'status_id')}>
                        <option value={1}>A la venta</option>
                        <option value={2}>A la renta</option>
                        <option value={3}>Vendido</option>
                        <option value={4}>En renta</option>
                    </Select>
                    <SelectIcon onChange={(e) => functionToUpdate(e.target.value, 'icon')} value={valueToUpdate?.icon} />
                    {
                        errorModal && <Text color={'red.500'}>{errorModal}</Text>
                    }
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} variant={'outline'} onClick={onClick}>
                        {onClickButtonText}
                    </Button>
                    <Button onClick={cleanOption}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const Properties = () => {
    const endponit = '/properties'
    const [optionAdded, setOptionAdded] = useState({})
    const [optionSelected, setOptionSelected] = useState({})
    const [optionToDelete, setOptionToDelete] = useState(null)
    const { data, loading, error, fetchData } = UseFetch()
    const [refeshData, setRefeshData] = useState(false)
    const [errorModal, setErrorModal] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const showToast = useToast();
    const { user } = useAuth();

    useEffect(() => {
        fetchData({
            url: endponit,
            method: 'GET',
        });
    }, [fetchData, refeshData]);


    const updateContent = (content, label) => {
        setOptionSelected(prevState => ({
            ...prevState,
            [label]: content
        }))
    }

    const createContent = (content, label) => {
        setOptionAdded(prevState => ({
            ...prevState,
            [label]: content
        }))
    }

    const cleanOption = () => {
        setOptionSelected({})
        setOptionAdded({})
        onClose()
        onCloseCreate()
        onCloseDelete()
    }

    const selectOption = (property) => {
        setOptionSelected(property)
        onOpen()
    }

    const onUpdate = async () => {
        const optionToUpdate = {
            ...optionSelected,
            is_active: optionSelected.is_active == 1 ? true : false,
            user_id: optionSelected.user_id || null,
            property_type_id: optionSelected.property_type.id || null,
            status: optionSelected.status.name || null,
            price: Number(optionSelected.price) || null
        }
        delete optionToUpdate.property_type
        delete optionToUpdate.user
        try {
            await fetchData({
                url: `${endponit}/${optionSelected.id}`,
                method: 'PUT',
                body: optionToUpdate
            });
            showToast({
                title: "Edición exitosa",
                description: "La opción ha sido editada con exito",
                status: "success",
            })
            cleanOption()
            setRefeshData(!refeshData)
        } catch (error) {
            console.error(error)
            showToast({
                title: "Error al editar",
                description: "Hubo un error al editar la opción",
                status: "error",
            })
        }
        onClose()

    }

    const onCreate = async () => {
        const optionToAdd = {
            ...optionAdded,
            is_active: true,
            user_id: user.id || null,

        }
        try {
            propertySchema.parse(optionToAdd);
            await fetchData({
                url: `${endponit}`,
                method: 'POST',
                body: optionToAdd,
            });
            showToast({
                title: "Creación exitosa",
                description: "La opción ha sido creada con exito",
                status: "success",
            })
            setRefeshData(!refeshData)
            onCloseCreate()
        } catch (error) {
            console.error(error)
            const errorMessages = error.message && error.message.length > 0 ? error.message : error;
            const parsedErrors = errorMessages ? JSON.parse(errorMessages) : null;
            const firstError = parsedErrors && parsedErrors[0] ? `${parsedErrors[0].path[0]}: ${parsedErrors[0].message}` : null;
            setErrorModal(firstError)
            showToast({
                title: "Error al crear",
                description: "Hubo un error al crear la opción",
                status: "error",
            })

        }
    }

    const deleteOption = async () => {
        if (!optionToDelete) return;
        try {
            await fetchData({
                url: `${endponit}/${optionToDelete.id}`,
                method: 'DELETE',
            });
            showToast({
                title: "Eliminación exitosa",
                description: "La opción ha sido eliminada con exito",
                status: "success",
            })
            setRefeshData(!refeshData)
            cleanOption()
        } catch (error) {
            console.error(error)
            showToast({
                title: "Error al eliminar",
                description: "Hubo un error al eliminar la opción",
                status: "error",
            })
            return;
        }
    }

    if (loading) return <Loading />;
    if (error) return <Text color={'red.500'}>Error: {error}</Text>;

    return (
        <Container maxW={'container.xl'} py={4}>
            <Stack alignItems={'center'} justifyContent={'center'} w='100%'>
                <Text fontSize={'3xl'} w={'100%'} textAlign={'center'} fontWeight={'bold'}>Propiedades</Text>
                <Stack flexDir={'row'} w='100%' justifyContent={'flex-end'}>
                    <Button variant={'outline'} onClick={() => {
                        onOpenCreate();

                    }}>Agregar Propiedad</Button>

                </Stack>
                {data && data.length > 0 ? (
                    <TableContainer w={'100%'}>
                        <Table variant='simple' size={'sm'}>
                            <Thead>
                                <Tr bgColor={'gray.200'} >
                                    <Th textAlign={'center'}>Título</Th>
                                    <Th textAlign={'center'}>Descripción</Th>
                                    <Th textAlign={'center'}>Dirección</Th>
                                    <Th isNumeric textAlign={'center'} >Habitaciones</Th>
                                    <Th isNumeric textAlign={'center'} >Baños</Th>
                                    <Th isNumeric textAlign={'center'} >Precio</Th>
                                    <Th isNumeric textAlign={'center'} >Acciones</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    data.map((property, i) => (
                                        <Tr bgColor={i % 2 === 0 ? 'gray.100' : 'white'} key={property?.id}>
                                            <Td textAlign={'center'}>{property?.title}</Td>
                                            <Td textAlign={'center'}>{property?.description}</Td>
                                            <Td textAlign={'center'}>{property?.address}</Td>
                                            <Td textAlign={'center'} isNumeric>{property?.bedrooms}</Td>
                                            <Td textAlign={'center'} isNumeric>{property?.bathrooms}</Td>
                                            <Td textAlign={'center'} isNumeric>{property?.price}</Td>
                                            <Td textAlign={'center'}>
                                                <Stack flexDir={'row'} spacing={2} alignItems={'center'}>
                                                    <UniIcon icon={'UilEdit'} size={5} color='primary.default' cursor={'pointer'} onClick={() => selectOption(property)} />
                                                    <UniIcon icon={'UilTrash'} size={5} color='red' cursor={'pointer'} onClick={() => { onOpenDelete(); setOptionToDelete(property) }} />
                                                </Stack>
                                            </Td>
                                        </Tr>
                                    ))
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                ) : (
                    <Text>No properties found.</Text>
                )}

                <DeleteModal isOpen={isOpenDelete} onClose={onCloseDelete} onClick={() => deleteOption(optionSelected)} nameItem={'propiedad'} />
                <ContentModal
                    isOpen={isOpenCreate} onClose={cleanOption} title={'Crear nueva propiedad'} onClick={onCreate} functionToUpdate={createContent} valueToUpdate={optionAdded} cleanOption={cleanOption} errorModal={errorModal}
                    onClickButtonText={"Crear"} />

                <ContentModal
                    isOpen={isOpen} onClose={cleanOption} title={'Editar propiedad'} onClick={onUpdate} functionToUpdate={updateContent} valueToUpdate={optionSelected} cleanOption={cleanOption} errorModal={errorModal}
                    onClickButtonText={"Actualizar"}
                />
            </Stack>
        </Container>
    )
}

export default Properties
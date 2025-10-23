import React, { useEffect, useState } from 'react'
import UseFetch from '../../utils/UseFetch';
import { Stack, Text, useDisclosure, useToast, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Input, Button, Select, Switch, } from '@chakra-ui/react';
import UniIcon from '../../utils/UniIcon';
import Loading from '../Loading';
import { useAuth } from '../../context/useAuth';
import DeleteModal from '../Modal/DeleteModal';
import { propertyImageSchema } from '../../schemas/property_images';
import DataTable from 'react-data-table-component';

const ContentModal = ({ isOpen, onClose, title, onClick, functionToUpdate, valueToUpdate, cleanOption, errorModal, onClickButtonText, properties }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody gap={2} display={'flex'} flexDir={'column'}>
                    <Text>Url</Text>
                    <Input value={valueToUpdate?.image_url} onChange={(e) => functionToUpdate(e.target.value, 'image_url')}></Input>
                    <Text>Caption</Text>
                    <Input value={valueToUpdate?.caption} onChange={(e) => functionToUpdate(e.target.value, 'caption')}></Input>
                    <Stack direction={'row'} spacing={4} alignItems={'center'} mt={4}>
                        <Text>Imagen primaria</Text>
                        <Switch onChange={(e) => functionToUpdate(e.target.checked ? 1 : 0, 'is_primary')} defaultChecked={valueToUpdate?.is_primary} />
                    </Stack>
                    {
                        properties && properties.length > 0 && (
                            <>
                                <Text>Propiedad</Text>
                                <Select placeholder='Selecciona una propiedad' onChange={(e) => functionToUpdate(parseInt(e.target.value), 'property_id')}>
                                    {
                                        properties.map((property) => (
                                            <option key={property.id} value={property.id} selected={valueToUpdate?.property_id === property.id}>{property.title}</option>
                                        ))
                                    }
                                </Select>
                            </>
                        )
                    }
                    {
                        errorModal && <Text color={'red.500'}>{errorModal}</Text>
                    }
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} onClick={onClick}>
                        {onClickButtonText}
                    </Button>
                    <Button variant={'outline'} onClick={cleanOption}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const PropertyImages = () => {
    const endponit = '/properties/images'
    const [optionAdded, setOptionAdded] = useState({})
    const [optionSelected, setOptionSelected] = useState({})
    const [optionToDelete, setOptionToDelete] = useState(null)
    const { data, loading, error, fetchData } = UseFetch()
    const [refeshData, setRefeshData] = useState(false)
    const [errorModal, setErrorModal] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const [properties, setProperties] = useState([])
    const { user } = useAuth();

    const showToast = useToast();
    useEffect(() => {

        fetchData({
            url: '/properties',
            method: 'GET',
        }).then(response => {
            if (response) {
                setProperties(response)
            }
        });

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
        setErrorModal(null)
    }

    const selectOption = (property) => {
        setOptionSelected(property)
        onOpen()
    }

    const onUpdate = async () => {
        const optionToUpdate = {
            ...optionSelected,
            is_primary: optionSelected.is_primary ? true : false,
        }
        delete optionToUpdate.user
        try {
            await fetchData({
                url: `${endponit}/update/${optionSelected.id}`,
                method: 'PATCH',
                body: optionToUpdate
            });
            showToast({
                title: "Edición exitosa",
                description: "La opción ha sido editada con exito",
                status: "success",
            })
            setRefeshData(!refeshData)
        } catch (error) {
            console.error(error)
            showToast({
                title: "Error al editar",
                description: "Hubo un error al editar la opción",
                status: "error",
            })
        }
        cleanOption()

    }

    const onCreate = async () => {
        const optionToAdd = {
            ...optionAdded,
            user_id: user.id || null,
            is_primary: optionAdded.is_primary == 1 ? true : false,
        }
        try {
            propertyImageSchema.parse(optionToAdd);
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
        cleanOption()
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Caption',
            selector: row => row.caption,
            sortable: true,
        },
        {
            name: 'Imagen',
            selector: row => row?.image_url?.length > 50 ? (
                <Text>
                    {row?.image_url?.slice(0, 50)}...
                </Text>
            ) : (
                <Text>{row?.image_url}</Text>
            ),
        },
        {
            name: 'Imagen primaria',
            selector: row => row?.is_primary ? 'Si' : 'No',
            sortable: true,
        },
        {
            name: 'Propiedad',
            selector: row => row.property_id,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <Stack flexDir={'row'} spacing={2} alignItems={'center'}>
                    <UniIcon icon={'UilEdit'} size={5} color='primary.default' cursor={'pointer'} onClick={() => selectOption(row)} />
                    <UniIcon icon={'UilTrash'} size={5} color='red' cursor={'pointer'} onClick={() => { onOpenDelete(); setOptionToDelete(row) }} />
                </Stack>
            )
        },
    ];

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
    if (error) return <p>Error: {error}</p>;

    return (
        <Stack alignItems={'center'} justifyContent={'center'} w='100%' >
            <Text fontSize={{ base: 'lg', md: '3xl' }} w={'100%'} textAlign={'center'} fontWeight={'bold'}>Imágenes</Text>
            <Stack flexDir={'row'} w='100%' justifyContent={'flex-end'}>
                <Button variant={'outline'} onClick={() => {
                    onOpenCreate();

                }}>Agregar imagen</Button>

            </Stack>
            {data && data.length > 0 ? (
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                />
            ) : (
                <Text>No images found.</Text>
            )}
            <DeleteModal isOpen={isOpenDelete} onClose={onCloseDelete} onClick={() => deleteOption(optionSelected)} nameItem={'imagen'} />
            <ContentModal
                isOpen={isOpenCreate} onClose={cleanOption} title={'Crear nueva imagen'} onClick={onCreate} functionToUpdate={createContent} valueToUpdate={optionAdded} cleanOption={cleanOption} errorModal={errorModal}
                onClickButtonText={"Crear"} properties={properties} />
            <ContentModal
                isOpen={isOpen} onClose={cleanOption} title={'Editar imagen'} onClick={onUpdate} functionToUpdate={updateContent} valueToUpdate={optionSelected} cleanOption={cleanOption} errorModal={errorModal}
                onClickButtonText={"Actualizar"} properties={properties}
            />
        </Stack>
    )
}

export default PropertyImages
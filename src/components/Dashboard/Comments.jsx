import React, { useEffect, useState } from 'react'
import UseFetch from '../../utils/UseFetch';
import { Stack, Text, useDisclosure, useToast, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Input, Button, Select, } from '@chakra-ui/react';
import UniIcon from '../../utils/UniIcon';
import Loading from '../Loading';
import { useAuth } from '../../context/useAuth';
import { commentSchema } from '../../schemas/comments';
import DeleteModal from '../Modal/DeleteModal';
import DataTable from 'react-data-table-component';

const ContentModal = ({ isOpen, onClose, title, onClick, functionToUpdate, valueToUpdate, cleanOption, errorModal, onClickButtonText, properties }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody gap={2} display={'flex'} flexDir={'column'}>
                    <Text>Comentario</Text>
                    <Input value={valueToUpdate?.comment} onChange={(e) => functionToUpdate(e.target.value, 'comment')}></Input>
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

const Comments = () => {
    const endponit = '/comments'
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
            user_id: optionSelected.user.id || null,
            is_active: optionSelected.is_active == 1 ? true : false,
        }
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
            is_active: true,
            user_id: user.id || null,
        }
        try {
            commentSchema.parse(optionToAdd);
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

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Usuario',
            selector: row => row.user?.name,
            sortable: true,
        },
        {
            name: 'Comentario',
            selector: row => row.comment,
        },
        {
            name: 'Fecha',
            selector: row => new Date(row?.created_at).toLocaleString('es-CO'),
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

    if (loading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return (
        <Stack alignItems={'center'} justifyContent={'center'} w='100%' >
            <Text fontSize={{ base: 'lg', md: '3xl' }} w={'100%'} textAlign={'center'} fontWeight={'bold'}>Comentarios</Text>
            <Stack flexDir={'row'} w='100%' justifyContent={'flex-end'}>
                <Button variant={'outline'} onClick={() => {
                    onOpenCreate();

                }}>Agregar Comentario</Button>

            </Stack>
            {data && data.length > 0 ? (
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                />
            ) : (
                <Text>No properties found.</Text>
            )}
            <DeleteModal isOpen={isOpenDelete} onClose={onCloseDelete} onClick={() => deleteOption(optionSelected)} nameItem={'comentario'} />
            <ContentModal
                isOpen={isOpenCreate} onClose={cleanOption} title={'Crear nuevo comentario'} onClick={onCreate} functionToUpdate={createContent} valueToUpdate={optionAdded} cleanOption={cleanOption} errorModal={errorModal}
                onClickButtonText={"Crear"} properties={properties} />
            <ContentModal
                isOpen={isOpen} onClose={cleanOption} title={'Editar comentario'} onClick={onUpdate} functionToUpdate={updateContent} valueToUpdate={optionSelected} cleanOption={cleanOption} errorModal={errorModal}
                onClickButtonText={"Actualizar"} properties={properties}
            />
        </Stack>
    )
}

export default Comments
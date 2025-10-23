import React, { useEffect, useState } from 'react'
import UseFetch from '../../utils/UseFetch';
import { Stack, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, useDisclosure, Input, Button, Switch, Select, } from '@chakra-ui/react';
import UniIcon from '../../utils/UniIcon';
import Loading from '../Loading';
import { userSchema } from '../../schemas/user';
import DeleteModal from '../Modal/DeleteModal';
import DataTable from 'react-data-table-component';

const Users = () => {
    const [optionAdded, setOptionAdded] = useState({})
    const [optionSelected, setOptionSelected] = useState({})
    const [optionToDelete, setOptionToDelete] = useState(null)
    const [refeshData, setRefeshData] = useState(false)
    const [errorModal, setErrorModal] = useState(null)
    const endponit = '/users'
    const { data, loading, error, fetchData } = UseFetch()
    const showToast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

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

    const selectOption = (property) => {
        setOptionSelected(property)
        onOpen()
    }

    const cleanOption = () => {
        setOptionSelected({})
        setOptionAdded({})
        onClose()
        onCloseCreate()
        onCloseDelete()
    }

    const updateOption = async () => {
        const optionToUpdate = {
            ...optionSelected,
            is_active: optionSelected.is_active == 1 ? true : false,
            is_anonymous: optionSelected.is_anonymous == 1 ? true : false,
        }
        try {
            const res = await fetchData({
                url: `${endponit}/${optionSelected.id}`,
                method: 'PUT',
                body: optionToUpdate,
            });
            if (res?.status === 200) {
                showToast({
                    title: "Edición exitosa",
                    description: "La opción ha sido editada con exito",
                    status: "success",
                })
                setRefeshData(!refeshData)
            } else {
                console.log({ res })
                showToast({
                    title: "Error al editar",
                    description: "Hubo un error al editar la opción",
                    status: "error",
                })
            }

        } catch (error) {
            console.error(error)
            showToast({
                title: "Error al editar",
                description: "Hubo un error al editar la opción",
                status: "error",
            })
        }
        cleanOption();
    }

    const onCreate = async () => {
        const optionToAdd = {
            ...optionAdded,
            is_active: optionSelected.is_active == 1 ? true : false,
            is_anonymous: optionSelected.is_anonymous == 1 ? true : false,
        }
        try {
            userSchema.parse(optionToAdd);
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
            name: 'Nombre',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Rol',
            selector: row => row.role.toUpperCase(),
            sortable: true,
        },
        {
            name: 'Activo',
            selector: row => row.is_active ? 'Sí' : 'No',
            sortable: true,
        },
        {
            name: 'Anónimo',
            selector: row => row.is_anonymous == 1 ? 'Sí' : 'No',
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
    if (error) return <Text color={'red.500'}>Error: {error}</Text>;
    return (
        <Stack alignItems={'center'} justifyContent={'center'} w='100%' >
            <Text fontSize={{ base: 'lg', md: '3xl' }} w={'100%'} textAlign={'center'} fontWeight={'bold'}>Usuarios</Text>
            <Stack flexDir={'row'} w='100%' justifyContent={'flex-end'}>
                <Button variant={'outline'} onClick={() => {
                    onOpenCreate();

                }}>Agregar usuario</Button>

            </Stack>

            {data && data.length > 0 ? (
                <>
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                    />
                </>
            ) : (
                <Text>No properties found.</Text>
            )}

            <DeleteModal isOpen={isOpenDelete} onClose={onCloseDelete} onClick={() => deleteOption(optionSelected)} nameItem={'usuario'} />

            <Modal isOpen={isOpenCreate} onClose={cleanOption} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Crear nuevo usuario</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Nombre</Text>
                        <Input placeholder='Nombre' value={optionAdded?.name || ''} onChange={(e) => createContent(e.target.value, 'name')}></Input>
                        <Text mt={4}>Email</Text>
                        <Input placeholder='Email' type='email' value={optionAdded?.email || ''} onChange={(e) => createContent(e.target.value, 'email')}></Input>
                        <Text mt={4}>Contraseña</Text>
                        <Input placeholder='Contraseña' type='password' value={optionAdded?.password || ''} onChange={(e) => createContent(e.target.value, 'password')}></Input>
                        <Stack direction={'row'} spacing={4} alignItems={'center'} mt={4}>
                            <Text>Activo</Text>
                            <Switch onChange={(e) => createContent(e.target.checked ? 1 : 0, 'is_active')} defaultChecked={optionAdded?.is_active == 1 ? true : false} />
                        </Stack>
                        <Stack direction={'row'} spacing={4} alignItems={'center'} mt={4}>
                            <Text>Anónimo</Text>
                            <Switch onChange={(e) => createContent(e.target.checked ? 1 : 0, 'is_anonymous')} defaultChecked={optionAdded?.is_anonymous == 1 ? true : false} />
                        </Stack>
                        <Select placeholder='Seleccione un rol' mt={4} value={optionAdded?.role} onChange={(e) => createContent(e.target.value, 'role')}>
                            <option value='admin'>Admin</option>
                            <option value='agent'>Agent</option>
                            <option value='customer'>Customer</option>
                        </Select>
                        {
                            errorModal && <Text color={'red.500'}>{errorModal}</Text>
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onCreate}>
                            Guardar
                        </Button>
                        <Button variant={'outline'} onClick={cleanOption}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpen} onClose={cleanOption} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar propiedad</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Nombre</Text>
                        <Input value={optionSelected?.name} onChange={(e) => updateContent(e.target.value, 'name')}></Input>
                        <Stack direction={'row'} spacing={4} alignItems={'center'} mt={4}>
                            <Text>Activo</Text>
                            <Switch onChange={(e) => updateContent(e.target.checked ? 1 : 0, 'is_active')} defaultChecked={optionSelected?.is_active == 1 ? true : false} />
                        </Stack>
                        <Stack direction={'row'} spacing={4} alignItems={'center'} mt={4}>
                            <Text>Anónimo</Text>
                            <Switch onChange={(e) => updateContent(e.target.checked ? 1 : 0, 'is_anonymous')} defaultChecked={optionSelected?.is_anonymous == 1 ? true : false} />
                        </Stack>
                        <Select placeholder='Seleccione un rol' mt={4} value={optionSelected?.role} onChange={(e) => updateContent(e.target.value, 'role')}>
                            <option value='admin'>Admin</option>
                            <option value='agent'>Agent</option>
                            <option value='customer'>Customer</option>
                        </Select>
                        {
                            errorModal && <Text color={'red.500'}>{errorModal}</Text>
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='outline' mr={3} onClick={cleanOption}>
                            Cerrar
                        </Button>
                        <Button variant='solid' onClick={updateOption}>Actualizar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Stack >
    )
}

export default Users
import React, { useEffect, useState } from 'react'
import UseFetch from '../../utils/UseFetch';
import { Stack, Text, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Input, Button, useToast, } from '@chakra-ui/react';
import UniIcon from '../../utils/UniIcon';
import Loading from '../Loading';
import DataTable from 'react-data-table-component';

const Status = () => {
    const endponit = '/properties/status'
    const [optionSelected, setOptionSelected] = useState({})
    const [refeshData, setRefeshData] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const showToast = useToast();
    const { data, loading, error, fetchData } = UseFetch()
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

    const selectOption = (property) => {
        setOptionSelected(property)
        onOpen()
    }

    const updateOption = async () => {
        const optionToUpdate = {
            ...optionSelected,
        }
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
        onClose()

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
            name: 'Acciones',
            cell: row => (
                <Stack flexDir={'row'} spacing={2} alignItems={'center'}>
                    <UniIcon icon={'UilEdit'} size={10} color='primary.default' cursor={'pointer'} onClick={() => selectOption(row)} />
                </Stack>
            )
        },
    ];

    if (loading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return (
        <Stack alignItems={'center'} justifyContent={'center'} w='100%' >
            <Text fontSize={{ base: 'lg', md: '3xl' }} w={'100%'} textAlign={'center'} fontWeight={'bold'}>Status</Text>

            {data && data.length > 0 ? (
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                />
            ) : (
                <Text>No properties found.</Text>
            )}

            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar propiedad</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Nombre</Text>
                        <Input value={optionSelected?.name} onChange={(e) => updateContent(e.target.value, 'name')}></Input>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cerrar
                        </Button>
                        <Button variant='solid' onClick={updateOption}>Actualizar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Stack>
    )
}

export default Status
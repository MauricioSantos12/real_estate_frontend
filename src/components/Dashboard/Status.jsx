import React, { useEffect, useState } from 'react'
import UseFetch from '../../utils/UseFetch';
import { Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Input, Button, useToast, } from '@chakra-ui/react';
import UniIcon from '../../utils/UniIcon';
import Loading from '../Loading';

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

    const updateOption = () => async () => {
        const optionToUpdate = {
            ...optionSelected,
        }
        console.log({ optionToUpdate })
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

    if (loading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return (
        <Stack alignItems={'center'} justifyContent={'center'} w='100%' >
            <Text fontSize={'3xl'} w={'100%'} textAlign={'center'} fontWeight={'bold'}>Status</Text>

            {data && data.length > 0 ? (
                <TableContainer w={'100%'}>
                    <Table variant='simple' size={'lg'}>
                        <Thead>
                            <Tr bgColor={'gray.200'} >
                                <Th isNumeric>ID</Th>
                                <Th>Nombre</Th>
                                <Th>Acciones</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                data.map((status, i) => (
                                    <Tr bgColor={i % 2 === 0 ? 'gray.100' : 'white'} key={status?.id}>
                                        <Td isNumeric>{status?.id}</Td>
                                        <Td>{status?.name}</Td>
                                        <Td ><UniIcon icon={'UilEdit'} size={10} color='primary.default' cursor={'pointer'} onClick={() => selectOption(status)} /></Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>

                    </Table>
                </TableContainer>
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
                        <Button variant='solid' onClick={updateOption()}>Actualizar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Stack>
    )
}

export default Status
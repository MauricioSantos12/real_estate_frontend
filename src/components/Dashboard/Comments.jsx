import React, { useEffect, useState } from 'react'
import UseFetch from '../../utils/UseFetch';
import { Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Input, Button, } from '@chakra-ui/react';
import UniIcon from '../../utils/UniIcon';
import Loading from '../Loading';

const Comments = () => {
    const endponit = '/comments'
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
            user_id: optionSelected.user.id || null,
            is_active: optionSelected.is_active == 1 ? true : false
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
        onClose()

    }

    if (loading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return (
        <Stack alignItems={'center'} justifyContent={'center'} w='100%' >
            <Text fontSize={'3xl'} w={'100%'} textAlign={'center'} fontWeight={'bold'}>Comentarios</Text>

            {data && data.length > 0 ? (
                <TableContainer w={'100%'}>
                    <Table variant='simple' size={'lg'}>
                        <Thead>
                            <Tr bgColor={'gray.200'} >
                                <Th >ID</Th>
                                <Th >Usuario</Th>
                                <Th>Comentario</Th>
                                <Th>Fecha</Th>
                                <Th isNumeric >Propiedad</Th>
                                <Th>Acciones</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                data.map((comment, i) => (
                                    <Tr bgColor={i % 2 === 0 ? 'gray.100' : 'white'} key={comment?.id}>
                                        <Td>{comment?.id}</Td>
                                        <Td>{comment?.user?.name}</Td>
                                        <Td>{comment?.comment}</Td>
                                        <Td>{new Date(comment?.created_at).toLocaleString('es-CO')}</Td>
                                        <Td isNumeric>{comment?.property_id}</Td>
                                        <Td ><UniIcon icon={'UilEdit'} size={10} color='primary.default' cursor={'pointer'} onClick={() => selectOption(comment)} /></Td>
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
                        <Text>Comentario</Text>
                        <Input value={optionSelected?.comment} onChange={(e) => updateContent(e.target.value, 'comment')}></Input>
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

export default Comments
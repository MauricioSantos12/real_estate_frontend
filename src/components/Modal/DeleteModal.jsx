import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'

const DeleteModal = ({ isOpen, onClose, onClick, nameItem }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{`Eliminar ${nameItem}`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>¿Estás seguro que deseas eliminar este {nameItem}? </Text>
                    <Text> Esta acción no se puede deshacer.</Text>
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} variant={'outline'} onClick={onClick}>
                        Eliminar
                    </Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteModal
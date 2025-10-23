import { Container, Grid, GridItem, VStack, Link, Text, Stack, Button, Image, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import Properties from '../components/Dashboard/Properties'
import Comments from '../components/Dashboard/Comments'
import Status from '../components/Dashboard/Status'
import Types from '../components/Dashboard/Types'
import Users from '../components/Dashboard/Users'
import PropertyImages from '../components/Dashboard/PropertyImages'
import UseFetch from '../utils/UseFetch'
import Loading from '../components/Loading'
import PrincipalView from '../components/Dashboard/PrincipalView'
import UniIcon from '../utils/UniIcon'


const Dashboard = () => {
    const [activePage, setActivePage] = useState("")
    const { data: dataProperties, loading: loadingProperties, error: errorProperties, fetchData: fetchDataProperties } = UseFetch()
    const { data: dataUsers, loading: loadingUsers, error: errorUsers, fetchData: fetchDataUsers } = UseFetch()
    const { data: dataComments, loading: loadingComments, error: errorComments, fetchData: fetchDataComments } = UseFetch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    useEffect(() => {
        fetchDataProperties({
            url: '/properties',
            method: 'GET',
        });
        fetchDataUsers({
            url: '/users',
            method: 'GET',
        });
        fetchDataComments({
            url: '/comments',
            method: 'GET',
        });
    }, [fetchDataProperties, fetchDataUsers, fetchDataComments]);

    const renderContent = () => {
        switch (activePage) {
            case "properties":
                return <Properties />
            case "status":
                return <Status />
            case "types":
                return <Types />
            case "comments":
                return <Comments />
            case "users":
                return <Users />
            case "property_images":
                return <PropertyImages />
            default:
                return <PrincipalView properties={dataProperties} users={dataUsers} comments={dataComments} />
        }
    }

    const activePageHandler = (page) => {
        setActivePage(page);
        onClose();
    }

    if (loadingProperties || loadingUsers || loadingComments) return <Loading />;
    if (errorProperties || errorUsers || errorComments) return <Text color={'red.500'}>Error: {errorProperties || errorUsers || errorComments}</Text>;


    return (
        <Stack align="center" justifyContent={'center'} h="auto" w="100%" >
            <Stack w="100%" h="100%" p={0} m="0 auto">
                <Grid gridTemplateColumns={{ base: '50px calc(100% - 58px)', md: '50px 1fr' }} gap={2} align-items='stretch' justifyContent={'center'}>
                    {/* Sidebar */}
                    <GridItem bg="background.dark" w={'100%'} >
                        <VStack align="stretch" spacing={4} alignItems={'center'} justifyContent={'center'} cursor={'pointer'} h={'100%'}>
                            <UniIcon icon='UilUser' size="30" color={activePage === "users" ? "primary.default" : "white"} onClick={onOpen} />
                            <UniIcon icon='UilBuilding' size="30" color={activePage === "properties" ? "primary.default" : "white"} onClick={onOpen} />
                            <UniIcon icon='UilImage' size="30" color={activePage === "property_images" ? "primary.default" : "white"} onClick={onOpen} />
                            <UniIcon icon='UilComments' size="30" color={activePage === "comments" ? "primary.default" : "white"} onClick={onOpen} />
                            <UniIcon icon='UilBookmark' size="30" color={activePage === "status" ? "primary.default" : "white"} onClick={onOpen} />
                            <UniIcon icon='UilEllipsisV' size="30" color={activePage === "types" ? "primary.default" : "white"} onClick={onOpen} />

                        </VStack>
                    </GridItem>
                    <Drawer placement="left" initialFocusRef={btnRef} isOpen={isOpen} onClose={onClose}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>Menu</DrawerHeader>
                            <DrawerBody>
                                <VStack align="stretch" spacing={4}>
                                    <Button onClick={() => activePageHandler("users")} variant={activePage === "users" ? "solid" : "outline"}>Users</Button>
                                    <Button onClick={() => activePageHandler("properties")} variant={activePage === "properties" ? "solid" : "outline"}>Properties</Button>
                                    <Button onClick={() => activePageHandler("property_images")} variant={activePage === "property_images" ? "solid" : "outline"}>Imágenes</Button>
                                    <Button onClick={() => activePageHandler("comments")} variant={activePage === "comments" ? "solid" : "outline"}>Comments</Button>
                                    <Button onClick={() => activePageHandler("status")} variant={activePage === "status" ? "solid" : "outline"}>Status</Button>
                                    <Button onClick={() => activePageHandler("types")} variant={activePage === "types" ? "solid" : "outline"}>Types</Button>
                                </VStack>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>

                    {/* Main */}
                    <GridItem p={4} display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="flex-start" w={{ base: '100%', md: '90%' }} h={{ base: 'auto', md: '100%' }} >
                        {renderContent()}
                    </GridItem>
                </Grid>
            </Stack>
        </Stack>
    )
}

export default Dashboard

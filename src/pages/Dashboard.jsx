import { Container, Grid, GridItem, VStack, Link, Text, Stack, Button, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import Properties from '../components/Dashboard/Properties'
import Comments from '../components/Dashboard/Comments'
import Status from '../components/Dashboard/Status'
import Types from '../components/Dashboard/Types'
import Users from '../components/Dashboard/Users'
import logo from '../assets/logo.png'
import PropertyImages from '../components/Dashboard/PropertyImages'


const Dashboard = () => {

    const [activePage, setActivePage] = useState("")
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
                return <Stack>
                    <Text fontSize={'3xl'} w={'100%'} textAlign={'center'} fontWeight={'bold'}>Welcome to the Dashboard</Text>
                    <Text fontSize={'lg'} w={'100%'} textAlign={'center'}>Select an option from the menu</Text>
                    <Image src={logo} alt="logo" width='auto' height={'auto'} maxH={'300px'} />
                </Stack>
        }
    }
    return (
        <Stack align="center" justifyContent={'center'} h="auto" w="100%" bgColor={"gray.50"}>
            <Container maxW="container.xl" w="100%" h="100vh" p={0} m="0 auto">
                <Grid
                    templateAreas={`"nav main"`}
                    gridTemplateColumns={'200px 1fr'}
                    h="100vh"
                    gap="1"
                >
                    {/* Sidebar */}
                    <GridItem bg="gray.100" area={'nav'} p={4}>
                        <VStack align="stretch" spacing={4}>
                            <Text onClick={() => setActivePage("")} fontSize="lg" fontWeight="bold" cursor={"pointer"}>Dashboard</Text>
                            <Button onClick={() => setActivePage("users")} variant={activePage === "users" ? "solid" : "outline"}>Users</Button>
                            <Button onClick={() => setActivePage("properties")} variant={activePage === "properties" ? "solid" : "outline"}>Properties</Button>
                            <Button onClick={() => setActivePage("property_images")} variant={activePage === "property_images" ? "solid" : "outline"}>Imágenes</Button>
                            <Button onClick={() => setActivePage("comments")} variant={activePage === "comments" ? "solid" : "outline"}>Comments</Button>
                            <Button onClick={() => setActivePage("status")} variant={activePage === "status" ? "solid" : "outline"}>Status</Button>
                            <Button onClick={() => setActivePage("types")} variant={activePage === "types" ? "solid" : "outline"}>Types</Button>
                        </VStack>
                    </GridItem>

                    {/* Main */}
                    <GridItem bg="gray.100" w='100%' area={'main'} p={6} display={'flex'} justifyContent={'center'} alignItems={!activePage ? 'center' : 'flex-start'} >
                        {renderContent()}
                    </GridItem>
                </Grid>
            </Container>
        </Stack>
    )
}

export default Dashboard

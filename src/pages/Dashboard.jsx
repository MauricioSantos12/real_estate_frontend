import { Container, Grid, GridItem, VStack, Link, Text, Stack, Button, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Properties from '../components/Dashboard/Properties'
import Comments from '../components/Dashboard/Comments'
import Status from '../components/Dashboard/Status'
import Types from '../components/Dashboard/Types'
import Users from '../components/Dashboard/Users'
import PropertyImages from '../components/Dashboard/PropertyImages'
import UseFetch from '../utils/UseFetch'
import Loading from '../components/Loading'
import PrincipalView from '../components/Dashboard/PrincipalView'


const Dashboard = () => {
    const [activePage, setActivePage] = useState("")
    const { data: dataProperties, loading: loadingProperties, error: errorProperties, fetchData: fetchDataProperties } = UseFetch()
    const { data: dataUsers, loading: loadingUsers, error: errorUsers, fetchData: fetchDataUsers } = UseFetch()
    const { data: dataComments, loading: loadingComments, error: errorComments, fetchData: fetchDataComments } = UseFetch()

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

    if (loadingProperties || loadingUsers || loadingComments) return <Loading />;
    if (errorProperties || errorUsers || errorComments) return <Text color={'red.500'}>Error: {errorProperties || errorUsers || errorComments}</Text>;


    return (
        <Stack align="center" justifyContent={'center'} h="auto" w="100%" bgColor={"gray.50"}>
            <Stack w="100%" h="100%" p={0} m="0 auto">
                <Stack direction="row" h={{ base: 'auto', md: '100%' }} gap={5} display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="flex-start">
                    {/* Sidebar */}
                    <Stack bg="gray.100" p={4} w={{ base: '100%', md: '200px' }} >
                        <VStack align="stretch" spacing={4}>
                            <Text onClick={() => setActivePage("")} fontSize="lg" fontWeight="bold" cursor="pointer">Dashboard</Text>
                            <Button onClick={() => setActivePage("users")} variant={activePage === "users" ? "solid" : "outline"}>Users</Button>
                            <Button onClick={() => setActivePage("properties")} variant={activePage === "properties" ? "solid" : "outline"}>Properties</Button>
                            <Button onClick={() => setActivePage("property_images")} variant={activePage === "property_images" ? "solid" : "outline"}>Imágenes</Button>
                            <Button onClick={() => setActivePage("comments")} variant={activePage === "comments" ? "solid" : "outline"}>Comments</Button>
                            <Button onClick={() => setActivePage("status")} variant={activePage === "status" ? "solid" : "outline"}>Status</Button>
                            <Button onClick={() => setActivePage("types")} variant={activePage === "types" ? "solid" : "outline"}>Types</Button>
                        </VStack>
                    </Stack>

                    {/* Main */}
                    <Stack bg="gray.100" p={6} display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="flex-start" w={{ base: '100%', md: 'calc(100% - 220px)' }} h={{ base: 'auto', md: '100%' }} >
                        {renderContent()}
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Dashboard

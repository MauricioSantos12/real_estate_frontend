import { Button, Container, Heading, Input, Stack, Toast, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const { login, loading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const showToast = useToast();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const data = await login(email, password);
            if (data) {
                showToast({
                    title: "Login Successful",
                    description: "Welcome back!",
                    status: "success",
                });
                navigate("/dashboard");
            } else {
                showToast({
                    title: "Login Failed",
                    description: "Invalid email or password",
                    status: "error",
                })
            }
            // You can redirect or show success message here
        } catch (err) {
            console.error("Error logging in", err);
        }
    };

    return (
        <Stack
            h="calc(100vh - 268px)"
            w="100%"
            alignItems={"center"}
            justifyContent={"center"}
            bgColor={"gray.100"}
        >
            <Container
                w={"100%"}
                h={"100%"}
                maxW={"container.xl"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Stack
                    p={8}
                    gap={6}
                    w={"100%"}
                    h={"auto"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    bgColor={"white"}
                    borderRadius={8}
                    boxShadow={"xl"}
                    maxW={"700px"}
                >
                    <Heading fontSize={"3xl"} fontWeight={700}>
                        Real Estate
                    </Heading>
                    <Heading fontSize={"2xl"} fontWeight={500}>
                        Iniciar Sesión
                    </Heading>
                    <Input
                        placeholder="Correo Electrónico"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        w={"100%"}
                        variant={"solid"}
                        onClick={handleLogin}
                        isLoading={loading}
                    >
                        Iniciar Sesión
                    </Button>
                </Stack>
            </Container>
        </Stack>
    );
};

export default Login;

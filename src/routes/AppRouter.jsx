import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Properties from "../pages/Properties";
import PropertyDetail from "../pages/PropertyDetail";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
function AppRouter() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <Layout>
                        <Login />
                    </Layout>
                }
            />
            <Route
                path="/"
                element={
                    <Layout>
                        <Home />
                    </Layout>
                }
            />
            <Route
                path="/properties"
                element={
                    <Layout>
                        <Properties />
                    </Layout>
                }
            />
            <Route
                path="/properties/:id"
                element={
                    <Layout>
                        <PropertyDetail />
                    </Layout>
                }
            />

            {/* Protected routes */}
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Layout><Dashboard /></Layout>

                    </PrivateRoute>
                }
            />

        </Routes>
    );
}

export default AppRouter;

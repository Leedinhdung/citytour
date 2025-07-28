import './App.css'
import { adminRoutes, clientRoutes } from "@/constants/routesContant";
import ClientLayout from "@/layouts/client/ClientLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from '@/layouts/admin/AdminLayout';


function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {/* Routes cho Client */}
                    {clientRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <ClientLayout>
                                    <route.element />
                                </ClientLayout>
                            }
                        />
                    ))}
                    {adminRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <AdminLayout>
                                    <route.element />
                                </AdminLayout>
                            }
                        />
                    ))}

                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App

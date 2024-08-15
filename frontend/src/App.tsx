import { AuthProvider } from './features/auth/context/AuthProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedLayout } from './components/layout/ProtectedLayout'
import { Login } from './features/auth/components/Login'
import { Register } from './features/auth/components/Register'
import {Profile} from "./features/profile/components/Profile";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedLayout>
                                <Profile/>
                            </ProtectedLayout>
                        }
                    />

                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App

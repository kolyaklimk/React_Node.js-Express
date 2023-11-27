import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListRoomsPage } from './pages/ListRoomsPage';
import { RoomPage } from './pages/RoomPage';
import { CreateRoomPage } from './pages/CreateRoomPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage, RegisterPage } from './pages/AuthPage';
import { MainPage } from './pages/MainPage';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import base from './js/base';
import './css/base.css';
import './css/other.css';
function App() {
    base();
    const { token, login, logout, _id, isAdmin, ready } = useAuth();
    const isAuthenticated = !!token;
    return (
        <AuthContext.Provider value={{
            token, login, logout, _id, isAdmin, isAuthenticated, ready
        }}>
            <div class="loader"></div>
            <BrowserRouter>
                <Routes>
                    <Route path="rooms" element={<ListRoomsPage />}>
                    </Route>
                    <Route path="rooms/:id" element={<RoomPage />} >
                    </Route>
                    <Route path="rooms/create" element={<CreateRoomPage />} >
                    </Route>
                    <Route path="profile" element={<ProfilePage />} >
                    </Route>
                    <Route path="auth/login" element={<LoginPage />}>
                    </Route>
                    <Route path="auth/register" element={<RegisterPage />} >
                    </Route>
                    <Route path="" element={<MainPage />} >
                    </Route>
                </Routes>
            </BrowserRouter>

        </AuthContext.Provider >
    );
}

export default App;

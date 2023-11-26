import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListRoomsPage } from './pages/ListRoomsPage';
import { RoomPage } from './pages/RoomPage';
import { CreateRoomPage } from './pages/CreateRoomPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage, RegisterPage } from './pages/AuthPage';
import { MainPage } from './pages/MainPage';
import './css/base.css';
import './css/other.css';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="rooms" element={<ListRoomsPage />}>
                </Route>
                <Route path="room/:id" element={<RoomPage />} >
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
    );
}

export default App;

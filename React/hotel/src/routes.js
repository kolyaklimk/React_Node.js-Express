import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ListRoomsPage } from './pages/ListRoomsPage';
import { RoomPage } from './pages/RoomPage';
import { CreateRoomPage } from './pages/CreateRoomPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage, RegisterPage } from './pages/AuthPage';
import { MainPage } from './pages/MainPage';

export const useRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/rooms" exact>
                    <ListRoomsPage />
                </Route>
                <Route path="/room/:id" exact>
                    <RoomPage />
                </Route>
                <Route path="/rooms/create" exact>
                    <CreateRoomPage />
                </Route>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Route path="/auth/login" exact>
                    <LoginPage />
                </Route>
                <Route path="/auth/register" exact>
                    <RegisterPage />
                </Route>
                <Route path="/" exact>
                    <MainPage />
                </Route>
            </Routes>
        </Router>
    );
};
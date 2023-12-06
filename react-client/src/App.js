import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ListRoomsPage } from './pages/ListRoomsPage';
import { RoomPage } from './pages/RoomPage';
import CreateRoomPage from './pages/CreateRoomPage.js';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage, RegisterPage } from './pages/AuthPage';
import { MainPage } from './pages/MainPage';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import base from './js/base';
import './css/base.css';
import './css/other.css';
import './css/footer-header.css';
import { Navbar } from './component/NavBar';

function App() {
    base();
    const { token, login, logout, _id, isAdmin, ready } = useAuth();
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{
            token, login, logout, _id, isAdmin, isAuthenticated, ready
        }}>
            <BrowserRouter>
                <div class="loader"></div>
                <div class="box-items-1">
                    <div class="whiteImage"></div>
                    <div class="blackYellowImage"></div>
                </div>
                <main>
                    <Navbar />
                    <div id="app"></div>
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
                </main>
                <footer>
                    <a class="my-button" href="/static/policy/policy.pdf" download="Privacy_Policies.pdf">PRIVACY POLICIES</a>
                </footer>
                <div class="box-items-2">
                    <div class="yellowImage"></div>
                    <div class="greenImage"></div>
                </div>
            </BrowserRouter>

        </AuthContext.Provider >
    );
}

export default App;

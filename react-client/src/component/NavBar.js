import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/footer-header.css';

function AuthButtons({ auth, navigate, props }) {
    return (
        <div>
            {
                auth.isAuthenticated && (
                    <div>
                        <label className="my-button" onClick={() => { auth.logout(); navigate('/'); }}>Sign Out</label>
                    </div>
                )
            }
            {
                !auth.isAuthenticated && (
                    <div>
                        <label className="my-button" onClick={() => { navigate('/auth/register'); }}>Up</label>
                        <label className="my-button" >{props || '/'}</label>
                        <label className="my-button" onClick={() => { navigate('/auth/login'); }} >In</label>
                    </div>
                )
            }
        </div>
    );
}

export const Navbar = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    return (
        <header className="menu">
            <label className="logo" onClick={() => { navigate('/') }}>HOTEL</label>
            <div className="menu-items">
                <label className="my-button" onClick={() => { navigate('/rooms') }}>ROOMS</label>
                <AuthButtons auth={auth} navigate={navigate} />
            </div>
        </header>
    )
}

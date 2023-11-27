import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const { loading, error, request, clearError } = useHttp();
    const message = useMessage();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        patronymic: '',
        birthDate: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const data = await request('/auth/register', 'POST', { ...formData })
            auth.login(data.token, data._id, data.admin);
            navigate('/');
        }
        catch (err) { }
    };

    return (
        <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
            <div>
                <label>
                    First Name:
                    <input className="input-1" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </label><br />
                <label>
                    Last Name:
                    <input className="input-1" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </label><br />
                <label>
                    Patronymic:
                    <input className="input-1" type="text" name="patronymic" value={formData.patronymic} onChange={handleChange} required />
                </label><br />
                <label>
                    Birth Date:
                    <input className="input-1" type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
                </label><br />
                <label>
                    Phone Number:
                    <input className="input-1" type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </label><br />
                <label>
                    Email:
                    <input className="input-1" type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label><br />
                <label>
                    Password:
                    <input className="input-1" type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label><br />
                <button className="button-1" onClick={handleSubmit} disabled={loading}>Submit</button>
            </div>
        </div>
    );
}


export const LoginPage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const { loading, error, request, clearError } = useHttp();
    const message = useMessage();
    const [formData, setFormData] = useState({
        email: '', password: '',
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const data = await request('/auth/login', 'POST', { ...formData })
            auth.login(data.token, data._id, data.admin);
            navigate('/');
        }
        catch (err) { }
    };

    return (
        <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
            <div>
                <label>
                    Email:
                    <input className="input-1" type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label><br />
                <label>
                    Password:
                    <input className="input-1" type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label><br />
                <button className="button-1" onClick={handleSubmit} disabled={loading}>Submit</button>
            </div>
        </div>
    );
}
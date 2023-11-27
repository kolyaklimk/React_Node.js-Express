import React, { useContext, useCallback, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { NavLink, useHistory, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/rooms.css';


export const RoomPage = () => {
    const { request, loading } = useHttp()
    const [room, setRoom] = useState(null);
    const [categories, setСategories] = useState([]);
    const [error_message, setError_message] = useState(null);
    const { isAdmin, isAuthenticated, token } = useContext(AuthContext);
    const roomId = useParams().id;

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request(`/rooms/${roomId}`, 'GET', null);
            setRoom(fetched);
            const data2 = await request('/categories', 'GET', null);
            setСategories(data2);
        } catch (e) { }
    }, [roomId, request])

    useEffect(() => { fetchLinks() }, [fetchLinks]);


    const handleCouponApply = (event) => {
        event.preventDefault();
        // Добавьте обработку применения купона здесь
    };

    const handleBookRoom = (event) => {
        event.preventDefault();
        // Добавьте обработку бронирования комнаты здесь
    };

    const handleEditRoom = (event) => {
        event.preventDefault();
        // Добавьте обработку редактирования комнаты здесь
    };

    if (loading) {
        return <div></div>
    }

    return (
        <>
            {!!loading &&
                <div style={{ textAlign: 'center' }}>
                    <image className="myimg" src={`/${room.photo}`} alt="My image" />
                    <div>Capacity: {room.capacity}</div>
                    <label>Price: </label> <label id="price">{room.price}</label>
                    <br /><br />

                    {isAuthenticated && !isAdmin && (
                        <div>
                            {error_message && <p>{error_message}</p>}
                            <form onSubmit={handleBookRoom}>
                                <div style={{ textAlign: 'center' }}>
                                    <label>Check-in date</label>
                                    <input className="input-1" type="date" name="check_in_date" required /><br />

                                    <label>Check-Out date:</label>
                                    <input className="input-1" type="date" name="check_out_date" required /><br />

                                    <label>Has_child (+5%):</label>
                                    <input className="input-1" type="checkbox" name="has_child" id="check" /><br /><br />

                                    <label>Total price: </label><label id="total"></label><br />
                                    <button className="button-1" name="book_room">Book a room</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {isAdmin && (
                        <form method="POST" enctype="multipart/form-data">
                            <div style={{ textAlign: 'center' }}>
                                <label>Price:</label>
                                <input className="input-1" type="number" min="0" step="any" name="price" required /><br />

                                <label>Capacity:</label>
                                <input className="input-1" type="number" min="0" max="10" name="capacity" required /><br />

                                <label>Photo:</label>
                                <input className="input-1" type="file" name="photo" required /><br />

                                <label>Category:</label>
                                <select className="register-button" name="select">
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select><br />

                                <button className="button-1" name="edit_room">Edit</button>
                            </div>
                        </form>
                    )}
                </div>
            }</>
    );
}
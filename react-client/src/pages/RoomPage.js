import React, { useContext, useCallback, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { NavLink, useHistory, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/rooms.css';

export const RoomPage = () => {
    const navigate = useNavigate();
    const { request, loading, clearError } = useHttp()
    const [room, setRoom] = useState(null);
    const [categories, setСategories] = useState([]);
    const { isAdmin, isAuthenticated, token } = useContext(AuthContext);
    const roomId = useParams().id;
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const fetchRoom = useCallback(async () => {
        try {
            const fetched = await request(`/rooms/${roomId}`, 'GET', null);
            setRoom(fetched);
        } catch (e) { }
    }, [roomId, request])


    const fetchCategories = useCallback(async () => {
        try {
            const data2 = await request('/categories', 'GET', null);
            setСategories(data2);
        } catch (e) { }
    }, [request])

    useEffect(() => { fetchCategories() }, [fetchCategories]);
    useEffect(() => { fetchRoom() }, [fetchRoom]);


    const handleBookRoom = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const checkInDate = formData.get('check_in_date');
        const checkOutDate = formData.get('check_out_date');
        const hasChild = formData.get('has_child') === 'on';

        const booking = {
            "room": roomId,
            "client": token,
            "checkInDate": checkInDate,
            "checkOutDate": checkOutDate,
            "hasChild": hasChild
        }

        try {
            await request(`/rooms/booking`, 'POST', booking, { Authorization: `Bearer ${token}` });
            navigate('/rooms');
        } catch (e) {
            alert(e);
            clearError();
        }
    };

    const handleEditRoom = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const price = parseFloat(formData.get('price'));
        const capacity = parseInt(formData.get('capacity'), 10);
        const category = formData.get('select');

        const formDataImage = new FormData();
        formDataImage.append('image', selectedFile);

        console.log(selectedFile);
        console.log(formDataImage);
        const editedData = {
            category: category,
            name: room.name,
            capacity: capacity,
            price: price,
            photo: selectedFile.name,
        };

        try {
            console.log(token);
            await fetch('/upload', {
                method: 'POST',
                body: formDataImage,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            await request(`/rooms/${roomId}`, 'PATCH', editedData, { Authorization: `Bearer ${token}` });
            navigate(`/rooms/${roomId}`);
        } catch (e) {
            console.log(e);
        }
    };


    if (loading) {
        return <div></div>
    }

    return (
        <>
            {!loading && room && categories &&
                <div style={{ textAlign: 'center' }}>
                    <img className="myimg" src={`http://localhost:8000/uploads/${room.photo}`} alt="My image" />
                    <div>Capacity: {room.capacity}</div>
                    <label>Price: </label> <label id="price">{room.price}</label>
                    <br /><br />

                    {isAuthenticated && !isAdmin && (
                        <div>
                            <form onSubmit={handleBookRoom}>
                                <div style={{ textAlign: 'center' }}>
                                    <label>Check-in date</label>
                                    <input className="input-1" type="date" name="check_in_date" required /><br />

                                    <label>Check-Out date:</label>
                                    <input className="input-1" type="date" name="check_out_date" required /><br />

                                    <label>Has_child:</label>
                                    <input className="input-1" type="checkbox" name="has_child" id="check" /><br /><br />

                                    <label>Total price: </label><label id="total"></label><br />
                                    <button className="button-1" name="book_room">Book a room</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {isAdmin && (
                        <form method="POST" enctype="multipart/form-data" onSubmit={handleEditRoom}>
                            <div style={{ textAlign: 'center' }}>
                                <label>Price:</label>
                                <input className="input-1" type="number" min="0" step="any" name="price" required /><br />

                                <label>Capacity:</label>
                                <input className="input-1" type="number" min="0" max="10" name="capacity" required /><br />

                                <label>Photo:</label>
                                <input className="input-1" type="file" name="photo" required onChange={handleFileInputChange} /><br />

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
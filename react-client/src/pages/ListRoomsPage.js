import React, { useContext, useCallback, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { NavLink, useHistory, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/rooms.css';

export const ListRoomsPage = () => {
    const navigate = useNavigate();
    const { request } = useHttp()
    const [rooms, setRooms] = useState([]);
    const [categories, setСategories] = useState([]);
    const { isAdmin, isAuthenticated, token } = useContext(AuthContext);
    const [isSortByPrice, setIsSortByPrice] = useState(false);
    const [originalRooms, setOriginalRooms] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchLinks = useCallback(async () => {
        try {
            const data2 = await request('/categories', 'GET', null);
            setСategories(data2);
            const data = await request('/rooms', 'GET', null);
            setRooms(data);
            setOriginalRooms(data);
        } catch (e) { }
    }, [request]);

    useEffect(() => { fetchLinks() }, [fetchLinks]);

    useEffect(() => {
        if (isSortByPrice) {
            setRooms(prevRooms => prevRooms.slice().sort((a, b) => a.price - b.price));
        } else {
            setRooms(originalRooms);
        }
    }, [isSortByPrice, originalRooms]);

    useEffect(() => {
        if (selectedCategory !== null) {
            const filteredRooms = originalRooms.filter(room => room.category.name === selectedCategory);
            setRooms(filteredRooms);
        } else {
            setRooms(originalRooms);
        }
    }, [selectedCategory, originalRooms]);

    const handleSortByPrice = () => {
        setIsSortByPrice(prevSort => !prevSort);
    };

    const handleCategoryChange = (event) => {
        const selectedCategoryId = event.target.value;
        setSelectedCategory(selectedCategoryId !== 'all' ? selectedCategoryId : null);
    };

    const deleteItem = async (roomId) => {
        try {
            await request(`/rooms/${roomId}`, 'DELETE', null, { authorization: token });
            window.location.reload();
        } catch (e) {
        }
    };

    return (
        <div className="all-item">
            {isAdmin && (
                <div className="but2">
                    <label className="button-1" style={{ float: 'right' }} onClick={() => { navigate('/rooms/create'); }}>
                        Add
                    </label>
                </div>
            )}

            <div className="but3">
                <label className="button-1" style={{ float: 'right' }} onClick={handleSortByPrice}>
                    {isSortByPrice ? 'Sorted by Price' : 'Sort by Price'}
                </label>

                <select
                    className="select-1"
                    style={{ float: 'right' }}
                    id="categorySelector"
                    onChange={handleCategoryChange}
                >
                    <option value="all">All</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id} >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <ul>
                {rooms.map((m) => (
                    <li className="card-wrapper" onClick={() => { navigate(`/rooms/${m._id}`); }}>
                        <div className="card" >
                            <div style={{ height: '250px' }}></div>
                            <div>
                                <div className="name-room" >{m.name}</div>
                                <div>Category: {m.category.name}</div>
                                <div>Capacity: {m.capacity}</div>
                                <div>Price: {m.price}</div>
                            </div>
                            {isAdmin && (
                                <button
                                    type="button"
                                    onClick={(event) => { event.stopPropagation(); deleteItem(m._id); }}
                                    id="delete"
                                    name="button1"
                                    className="button-1 button-card" >
                                    Delete
                                </button>
                            )}
                        </div>
                        <img className="image-card" src={`http://localhost:8000/uploads/${m.photo}`} alt="image" />
                    </li>
                ))}
                {rooms.length === 0 && <li>No rooms</li>}
            </ul>
        </div>
    );
};
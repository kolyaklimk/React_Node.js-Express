import ReactDOM from 'react-dom'
import React, { useContext, useCallback, useEffect, useState } from 'react';
import { useMessage } from '../hooks/message.hook';
import { NavLink, useHistory, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/rooms.css';

class CreateRoomPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imagefile:null,
            categories: null,
            category: '',
            name: '',
            capacity: '',
            price: '',
            photo: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    static contextType = AuthContext;

    async useMyHttp(url, method = 'GET', body = null, headers = {}) {
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, { method, body, headers })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Error')
            }

            return data
        } catch (e) {
            throw e
        }
    }

    async fetchCategories() {
        try {
            const data2 = await this.useMyHttp('/categories', 'GET', null);
            this.setState({ categories: data2 });
        } catch (e) {
            console.log(e);
        }
    }

    async componentDidMount() {
        await this.fetchCategories();
    }

    async handleBookRoom(category, name, capacity, price, photo) {
        const { token } = this.context;
        const room = {
            category: category,
            name: name,
            capacity: capacity,
            price: price,
            photo: this.state.imagefile.name
        };

        const formDataImage = new FormData();
        formDataImage.append('image', this.state.imagefile);

        try {
            await fetch('/upload', {
                method: 'POST',
                body: formDataImage,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            await this.useMyHttp(`/rooms`, 'POST', room, { Authorization: `Bearer ${token}` });
            alert('Room is created');
        } catch (e) {
            alert(e);
        }
    }

    validateCapacity(capacity) {
        return capacity > 0;
    }

    validatePrice(price) {
        return price > 0;
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { category, name, capacity, price, photo } = this.state;
        if (this.validateCapacity(capacity) && this.validatePrice(price)) {
            this.handleBookRoom(category, name, capacity, price, photo, event);
        }
    }

    handleImage(event) {
        event.preventDefault();
        this.setState({ imagefile: event.target.files[0] });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div style={{ textAlign: 'center' }}>
                    <label>Category:</label>
                    <select
                        className="select-1"
                        name="category"
                        value={this.category}
                        onChange={this.handleChange}
                        required
                    >
                        <option value="">Выберите категорию</option>
                        {this.state.categories !== null &&
                            this.state.categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))
                        }
                    </select><br />

                    <label>Room Name:</label>
                    <input
                        className="input-1"
                        type="text"
                        name="name"
                        value={this.name}
                        onChange={this.handleChange}
                        required
                    /><br />

                    <label>Capacity:</label>
                    <input
                        className="input-1"
                        type="number"
                        name="capacity"
                        value={this.capacity}
                        onChange={this.handleChange}
                        required
                    /><br />

                    <label>Price:</label>
                    <input
                        className="input-1"
                        type="number"
                        name="price"
                        value={this.price}
                        onChange={this.handleChange}
                        required
                    /><br />

                    <label>Photo:</label>
                    <input
                        className="input-1"
                        type="file"
                        name="photo"
                        onChange={this.handleImage}
                        required
                    /><br />

                    <button className="button-1" type="submit">Create Room</button>
                </div>
            </form>
        );
    }
}

export default CreateRoomPage;
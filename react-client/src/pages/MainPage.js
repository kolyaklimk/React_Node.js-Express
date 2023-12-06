import React, { useContext, useCallback, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { NavLink, useHistory, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/coupon.css';

export const MainPage = () => {
    const [userTimeZone, setuserTimeZone] = useState('');
    const [currentDate, setcurrentDate] = useState('');
    const [bookingutc, setbookingutc] = useState('');
    const [bookinguser, setbookinguser] = useState('');

    const [quote, setQuote] = useState('');
    const [joke, setJoke] = useState('');
    const { request } = useHttp();
    const { isAdmin, isAuthenticated, token } = useContext(AuthContext);


    const fetchLinks = useCallback(async () => {
        try {
            const data2 = await request('/api/joke', 'GET', null, { authorization: token });
            setJoke(data2.value);
            const data = await request('/api/quote', 'GET', null, { authorization: token });
            setQuote(data[0].content);
        } catch (e) { }
    }, [request, token]);

    const times = useCallback(async () => {
        try {
            const tableDate = await request('/rooms/booking/last', 'GET', null);

            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            setuserTimeZone(userTimeZone);
            const currentDate = new Date();
            setcurrentDate(currentDate.toDateString());

            const dateInUTC = new Date(tableDate);
            const dateInUserTimeZone = dateInUTC.toLocaleString('en-US', { timeZone: userTimeZone });
            const dateInUTCString = dateInUTC.toISOString();

            setbookingutc(dateInUTCString);
            setbookinguser(dateInUserTimeZone);
        }
        catch (e) { }
    }, [request]);

    useEffect(() => { fetchLinks() }, [fetchLinks]);
    useEffect(() => { times() }, [times]);

    return (
        <div>
            <div>
                <h1>Main Page</h1>
                {quote && (
                    <div>
                        <p>Random Quote: {quote}</p>
                    </div>
                )}
                {joke && (
                    <div>
                        <p>Random Joke: {joke}</p>
                    </div>
                )}
                {userTimeZone && currentDate && bookingutc && bookinguser && (
                    <table>
                        <tr>
                            <th>User Time Zone</th>
                            <th>Current Date</th>
                            <th>Booking UTC</th>
                            <th>Booking User</th>
                        </tr>
                        <tr>
                            <td>{userTimeZone}</td>
                            <td>{currentDate}</td>
                            <td>{bookingutc}</td>
                            <td>{bookinguser}</td>
                        </tr>
                    </table>
                )
                }
            </div>
            <div style={{ display: 'grid', placeItems: 'center', height: '80vh' }}></div>
        </div>

    );
};


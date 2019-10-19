import axios from 'axios';
import {getUser, sendMessage, createTweet, deleteTweet, getTweet} from './user.services';

const ajax = axios.create({
    baseURL: 'http://localhost:3030/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export {ajax, getUser, sendMessage, createTweet, deleteTweet, getTweet};

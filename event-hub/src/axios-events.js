import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://event-hub-195ae.firebaseio.com/'
});

export default instance;
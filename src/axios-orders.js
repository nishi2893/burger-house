import axios from 'axios';

const instance=axios.create({
    baseURL : 'https://my-burger123.firebaseio.com/'

});

export default instance;
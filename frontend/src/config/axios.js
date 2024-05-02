import axios from 'axios';

let token = JSON.parse(localStorage.getItem('user'))
  ? JSON.parse(localStorage.getItem('user')).token
  : null;

axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

export default axios;

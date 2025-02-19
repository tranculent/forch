import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });

export const logWorkout = (data: any) => API.post('/workout', data);

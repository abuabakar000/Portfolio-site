import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export const fetchProjects = () => API.get('/projects');
export const fetchExperience = () => API.get('/experience');

export default API;

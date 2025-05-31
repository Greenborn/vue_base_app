import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL; 

const api = axios.create({
  baseURL: apiBaseUrl,
});

export default {
  allUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },
  user: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  users: async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const response = await api.get('/users', {
      params: { page, pageSize },
    });
    return response.data;
  },
  allProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  project: async (id: string) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  projects: async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const response = await api.get('/projects', {
      params: { page, pageSize },
    });
    return response.data;
  },
  avatars: async () => {
    const response = await api.get('/avatars');
    return response.data;
  },
};
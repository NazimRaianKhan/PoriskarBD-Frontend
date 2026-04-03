import api from './api';

export async function getProfile() {
  const { data } = await api.get('/users/me');
  return data;
}

export async function getUsers(role) {
  const { data } = await api.get('/users', { params: role ? { role } : {} });
  return data;
}

export async function getCollectors() {
  const { data } = await api.get('/users/collectors');
  return data;
}

export async function deleteUser(id) {
  const { data } = await api.delete(`/users/${id}`);
  return data;
}

export async function updateMyProfile(payload) {
  const { data } = await api.put('/users/me', payload);
  return data;
}

export async function createCollector(payload) {
  const { data } = await api.post('/users/create-collector', payload);
  return data;
}

export async function createAdmin(payload) {
  const { data } = await api.post('/users/create-admin', payload);
  return data;
}
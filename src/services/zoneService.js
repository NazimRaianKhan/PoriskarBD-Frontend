import api from './api';

export async function getZones() {
  const { data } = await api.get('/zones');
  return data;
}

export async function createZone(payload) {
  const { data } = await api.post('/zones', payload);
  return data;
}

export async function updateZone(id, payload) {
  const { data } = await api.put(`/zones/${id}`, payload);
  return data;
}

export async function deleteZone(id) {
  const { data } = await api.delete(`/zones/${id}`);
  return data;
}
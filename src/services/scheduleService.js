import api from './api';

export async function getSchedules() {
  const { data } = await api.get('/schedules');
  return data;
}

export async function getSchedulesByZone(zoneId) {
  const { data } = await api.get(`/schedules/zone/${zoneId}`);
  return data;
}

export async function createSchedule(payload) {
  const { data } = await api.post('/schedules', payload);
  return data;
}

export async function updateSchedule(id, payload) {
  const { data } = await api.put(`/schedules/${id}`, payload);
  return data;
}

export async function deleteSchedule(id) {
  const { data } = await api.delete(`/schedules/${id}`);
  return data;
}
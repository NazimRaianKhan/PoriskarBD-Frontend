import api from './api';

export async function getReports() {
  const { data } = await api.get('/wastereports');
  return data;
}

export async function getReportById(id) {
  const { data } = await api.get(`/wastereports/${id}`);
  return data;
}

export async function createReport(payload) {
  const { data } = await api.post('/wastereports', payload);
  return data;
}

export async function filterReportsByStatus(status) {
  const { data } = await api.get('/wastereports/filter', { params: { status } });
  return data;
}

export async function assignCollector(id, collectorId) {
  const { data } = await api.patch(`/wastereports/${id}/assign`, { collectorId });
  return data;
}

export async function markCollected(id) {
  const { data } = await api.patch(`/wastereports/${id}/collect`);
  return data;
}

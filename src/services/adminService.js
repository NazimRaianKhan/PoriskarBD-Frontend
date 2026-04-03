import api from './api';

export async function getAdminStats() {
  const { data } = await api.get('/admin/stats');
  return data;
}

export async function getZoneSummary() {
  const { data } = await api.get('/admin/zone-summary');
  return data;
}

export async function getCollectionLogs() {
  const { data } = await api.get('/collectionlogs');
  return data;
}

export async function getCollectorLogs(collectorId) {
  const { data } = await api.get(`/collectionlogs/collector/${collectorId}`);
  return data;
}

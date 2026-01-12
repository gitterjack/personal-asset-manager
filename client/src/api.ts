import axios from 'axios';
import type { NewAsset, Asset } from './types';

const API_URL = 'http://localhost:3001/api';

export const fetchAssets = async () => {
  const response = await axios.get(`${API_URL}/assets`);
  return response.data.data;
};

export const createAsset = async (asset: NewAsset) => {
  const response = await axios.post(`${API_URL}/assets`, asset);
  return response.data;
};

export const updateAsset = async (id: number, asset: NewAsset) => {
  const response = await axios.put(`${API_URL}/assets/${id}`, asset);
  return response.data;
};

export const deleteAsset = async (id: number) => {
  const response = await axios.delete(`${API_URL}/assets/${id}`);
  return response.data;
};

/* eslint-disable no-console */
import { apiClient } from './api-client';

export const getData = async (endpoint: string) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async (endpoint: string, data: unknown) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const putData = async (endpoint: string, data: unknown) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error putting data:', error);
    throw error;
  }
};

export const optionsRequest = async (endpoint: string) => {
  try {
    const response = await apiClient.options(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error with options request:', error);
    throw error;
  }
};

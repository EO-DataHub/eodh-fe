import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://test.eodatahub.org.uk',
  headers: {
    'Content-Type': 'application/json',
  },
});

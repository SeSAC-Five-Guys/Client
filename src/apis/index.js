import axios from 'axios';

export const axiosWrite = axios.create({
  baseURL: `${process.env.REACT_APP_MEMBER_WRITE_HOST}`,
  timeout: 100000000000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosRead = axios.create({
  baseURL: `${process.env.REACT_APP_MEMBER_READ_HOST}`,
  timeout: 100000000000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosAuth = axios.create({
  baseURL: `${process.env.REACT_APP_AUTH_SERVER_HOST}`,
  timeout: 100000000000,
  headers: {
    'Content-Type': 'application/json',
  },
});

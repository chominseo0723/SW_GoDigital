import client from './client';

/** POST /api/auth/login */
export const loginRequest = credentials =>
  client.post('/auth/login', credentials);

/** POST /api/auth/logout */
export const logoutRequest = () => client.post('/auth/logout');

/** POST /api/auth/register */
export const registerRequest = data =>
  client.post('/auth/register', data);

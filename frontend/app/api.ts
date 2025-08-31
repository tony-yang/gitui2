import type { CreateClientConfig } from './_client/client.gen';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  // Development URL.
  baseURL: 'http://host.docker.internal:8000',

  // Production URL.
  // baseURL: 'http://host.docker.internal:9001',
});